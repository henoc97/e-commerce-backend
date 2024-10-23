
param (
    [Parameter(Mandatory = $true)]
    [string]$ServiceName,            

    [Parameter(Mandatory = $true)]
    [string]$ServicePath    
)


function ConvertTo-KebabCase {
    param (
        [string]$Name
    )

    if ($Name -eq $null) {
        return $null
    }

    $parts = @()
    $part = ""
    for ($i = 0; $i -lt $Name.Length; $i++) {
        if ([char]::IsUpper($Name[$i]) -and $part.Length -gt 0) {
            $parts += $part.ToLower()
            $part = ""
        } 

        $part += $Name[$i]
    }
    if ($part.Length) {
        $parts += $part.ToLower();
    }

    [string]::Join("-", $parts);
}

function ConvertTo-camelCase {
    param (
        [string]$name
    )
    
    $result = ($name.Substring(0, 1).ToLower()) + ($name.Substring(1))
    return $result
}


# Extracts method details, including return types, from the service content.
function Get-MethodDetails {
    param (
        [string]$content
    )


    # Regex pour capturer le nom de la méthode, les paramètres et le type de retour
    $regexPattern = "async\s+(\w+)\s*\(([^)]*)\)\s*:\s*(\w+<.*?>|[\w]+)"
    $matches = [regex]::Matches($content, $regexPattern)

    $methodDetails = @()

    foreach ($match in $matches) {
        $methodDetail = @{
            MethodName = $match.Groups[1].Value
            Parameters = $match.Groups[2].Value
            ReturnType = $match.Groups[3].Value -replace 'Promise<Promise<(.+?)>>', 'Promise<$1>'
        }
        $methodDetails += $methodDetail
    }

    return $methodDetails
}

function create-MockContent {
    param (
        [array]$methods,
        [string]$RepositoryName
    )

    $methodNmeList = @()
    $mockMethods = ""
    
    foreach ($method in $methods) {
        $methodName = $method.MethodName
        $methodNmeList += "$($methodName): jest.fn()"
    }
    $mockMethods = [string]::Join(",`r`n", $methodNmeList)

    return @"
const mock$($RepositoryName)Repository = {
  $mockMethods
};
"@
}
function Create-BeforeEach {
    param (
        [string]$RepositoryName
    )
    $RepositoryVAR = ($RepositoryName.Substring(0, 1).ToLower()) + ($RepositoryName.Substring(1))
    $repoStr = "'$($RepositoryName)Repository'"
    $repoCamel = "$($RepositoryVAR)Repository"
    return @"
beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        $($RepositoryName)Service,
        {
          provide: $repoStr,
          useValue: mock$($RepositoryName)Repository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<$($RepositoryName)Service>($($RepositoryName)Service);
    $repoCamel = module.get<I$($RepositoryName)Repository>($repoStr);
  });

afterEach(() => {
    jest.clearAllMocks();
  });


"@
}

function Create-its {
    param (
        [array]$Methods
    )
    $RepositoryVAR = ($ServiceName.Substring(0, 1).ToLower()) + ($ServiceName.Substring(1))
    $mock = "mock$($ServiceName)Repository"
    
    $itList = @()
    foreach ($method in $Methods) {
        $methodName = $method.MethodName
        $parameters = $method.Parameters
        $returnType = $method.ReturnType
        $methodNameKebab = (ConvertTo-KebabCase $methodName) -replace'\-', ' '
        
        $extraImports = ""
        $paramLines = $parameters -split ',\s*'
        $paramDef = ""
        foreach ($param in $paramLines) {
            if ($param -match '(\w+)\s*:\s*([\w<>]+)') {
                $paramName = $matches[1]
                $paramType = $matches[2]
                $data = "{ /* data */ }"
                if ($paramType -match 'number') {
                    $data = 1
                }
                if ($paramType -match 'int') {
                    $data = 1
                }
                if ($paramType -match 'boolean') {
                    $data = "true"
                }
                if ($paramType -match 'string') {
                    $data = "'$paramName'"
                }
                # if ($paramType -match '^[A-Z]') {
                #     $paramKebab = ConvertTo-KebabCase ($paramType -replace 'DTO', '')
                #     $extraImports += "`r`n    import { $($paramType) } from '../../src/presentation/dtos/$paramKebab.dto';"
                # }
                $paramDef += "`r`n     const $($paramName): $($paramType) = $data;"
            }
        }

        $formattedParameters = ($parameters -replace ':\s*\w+', '' -replace '<[^>]*>', '' -replace '\[\]', '' -replace '\{\}', '').Trim()
        $returnTypeFormatted = [regex]::Matches($returnType, "<(.*?)>") | ForEach-Object { $_.Groups[1].Value }
        $returnOject = "{ id: 1, /* others data */ }";
        if ($returnTypeFormatted -match "\[\]") {
            $returnOject = "[{ id: 1, /* others data */ }]"
        }

        if ($returnTypeFormatted -match 'number') {
            $returnOject = 1
        }
        if ($returnTypeFormatted -match 'int') {
            $returnOject = 1
        }
        if ($returnTypeFormatted -match 'boolean') {
            $returnOject = "true"
        }
        if ($returnTypeFormatted -match 'string') {
            $returnOject = "string-value"
        }

        $parametersFomatted = [regex]::Matches($string, "\b(\w+):") | ForEach-Object { $_.Groups[1].Value }
        $parametersFomatted = $parametersFomatted -join ', '

        $itList += @"
/* $methodNameKebab success and failure tests */
it('should $methodNameKebab', async () => {
    /** 
     * Tests the $methodNameKebab method.
     * Verifies that the returned $RepositoryVAR matches the expected one 
     * and that the repository's $methodName method is called with the correct data.
     */
    $paramDef

    const returnOject: $returnTypeFormatted = $returnOject
    
    $mock.$methodName.mockResolvedValue(returnOject);

    const result = await service.$($methodName)($formattedParameters);
    expect(result).toEqual(returnOject);
    expect($mock.$methodName).toHaveBeenCalledWith($formattedParameters);
});

it('should throw an error when $methodNameKebab method fails', async () => {
    $paramDef
    
    // Simulate a failure when calling the repository 
    $mock.$methodName.mockResolvedValue(" Repository error");

    const result = await service.$($methodName)($formattedParameters);
    expect(result).rejects.toThrow('Repository error');
});

"@
    }
    return [string]::Join("`r`n", $itList)
    
}

function create-servicesTestContent {
    param (
        [string]$RepositoryName,
        [string]$mockRepository,
        [string]$beforeEach,
        [string]$its
    )

    $nameKebab = ConvertTo-KebabCase $RepositoryName
    $nameCmael = ConvertTo-CamelCase $RepositoryName
    $service = "$($RepositoryName)Service"
    $repository = "$($nameCmael)Repository"
    return @"
import { Test, TestingModule } from '@nestjs/testing';
import { $service } from '../../src/application/services/$nameKebab.service';
import { I$($RepositoryName)Repository } from '../../src/domain/repositories/$nameKebab.repository';
import { $($RepositoryName) } from '../../src/domain/entities/$nameKebab.entity';
import { $($RepositoryName)DTO } from '../../src/presentation/dtos/$nameKebab.dto';
$extraImports

$mockRepository

describe('$service', () => {
    let service: $service;
    let $($repository): I$($RepositoryName)Repository;

    $beforeEach
    $its
})
"@

}

function Create-TestFile {
    param (
        [string]$fileName,
        [string]$content
    )
    Set-Content -Path $fileName -Value $content
}

# Reads the content of the service file.
function Get-ServiceContent {
    param (
        [string]$path
    )
    return Get-Content -Path $path -Raw
}

try {
    
    # Read the content of the service file
    $serviceContent = Get-ServiceContent -path $servicePath

    $kebabCaseName = ConvertTo-KebabCase $ServiceName
    $serviceFileName = "$kebabCaseName.service.spec.ts"
    
    $serviceMethods = Get-MethodDetails -content $serviceContent
    
    $beforeEach = Create-BeforeEach -RepositoryName $ServiceName
    
    $mockRepository = create-MockContent -RepositoryName $ServiceName -methods $serviceMethods
    
    $its = Create-its -Methods $serviceMethods
    
    
    $serviceTestContent = create-servicesTestContent -RepositoryName $ServiceName -beforeEach $beforeEach -mockRepository $mockRepository -its $its
    
    Create-TestFile -fileName $serviceFileName -content $serviceTestContent
    Write-Host "$serviceFileName TestFile successfully created"


}
catch {
    Write-Host "Error: $_"
}

