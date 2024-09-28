param (
    [string]$UseCasePath, # Path to the use-case file
    [string]$EntityName      # Name of the entity
)

# Function to convert a string to kebab-case
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

    [string]::Join("-", $parts)
}

function ConvertTo-camelCase {
    param (
        [string]$name
    )
    
    $result = ($name.Substring(0, 1).ToLower()) + ($name.Substring(1))
    return $result
}

# Function to convert a string to camelCase
function ConvertTo-camelCase {
    param (
        [string]$Name
    )
    # Convert the first character to lowercase and append the rest of the string
    return ($Name.Substring(0, 1).ToLower()) + ($Name.Substring(1))
}

# Function to read the content of the use-case file
function Get-UseCaseContent {
    param (
        [string]$path
    )
    return Get-Content -Path $path -Raw
}

# Function to extract the use-case class name from the content of the use-case file
function Get-UseCaseName {
    param (
        [string]$content
    )
    # Regular expression to match the class name
    if ($content -match "export\s+class\s+(\w+)") {
        return $matches[1]
    }
    else {
        throw "Unable to determine the entity name from the content."
    }
}

# Function to extract method details, including return types, from the service content
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


function Generate-FileContent {
    param (
        [string]$useCaseName,
        [string]$returnType,
        [string]$parameters
    )


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
    $entityNameKebab = ConvertTo-KebabCase $entityName
    $useCaseNameKebab = ConvertTo-KebabCase $useCaseName
    $useCaseNameCamel = ConvertTo-camelCase $useCaseName
    $service = "$($entityName)Service"
    $serviceNameCamel = ConvertTo-camelCase $service
    $mockDto = "mock$($EntityName)DTO"
    $mockService = "mock$($EntityName)Service"

    return @"
import { Test, TestingModule } from '@nestjs/testing';
import { $service } from '../../../src/application/services/$entityNameKebab.service';
import { $useCaseName } from '../../../src/application/use-cases/$entityNameKebab.use-cases/$useCaseNameKebab.use-case';
import { $($EntityName)DTO } from '../../../src/presentation/dtos/$entityNameKebab.dto';
import { to$($EntityName)DTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the $useCaseName use case.
 * This test covers the initialization and behavior of the $useCaseName class.
 * It mocks the $service service and verifies that the use case handles the business logic as expected.
 */
describe('$useCaseName', () => {
  let $($useCaseNameCamel): $useCaseName;
  let $($serviceNameCamel): $service;

  // Mock implementation of the $service service with jest functions
  const mock$($service) = {
    $($useCaseNameCamel): jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  $paramDef

  // Mock version of $EntityNameDTO to be used as input and expected output
  const mock$($EntityName)DTO: $($EntityName)DTO = {
    // TODO: Fill in your $($EntityName)DTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        $useCaseName,
        {
          provide: $service,
          useValue: mock$($service),
        },
      ],
    }).compile();

    $useCaseNameCamel = module.get<$useCaseName>($useCaseName);
    $serviceNameCamel = module.get<$service>($service);
  });

  /**
   * After each test, clear all jest mocks.
   * This ensures no interference between tests and guarantees a clean test environment.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case to verify that the use case executes successfully and returns a DTO.
   * This test ensures that the service method is called correctly and that the result is processed by `to$EntityNameDTO`.
   */
  it('should create and return an address DTO', async () => {
    // Mock service returning the expected DTO
    $mockService.$useCaseNameCamel.mockResolvedValue($mockDto);
    (to$($EntityName)DTO as jest.Mock).mockReturnValue($mockDto);

    // Execute the use case with provided parameters
    const result = await $useCaseNameCamel.execute($formattedParameters);

    // Verify that the service was called with the expected arguments
    expect($mockService.$useCaseNameCamel).toHaveBeenCalledWith($formattedParameters);

    // Verify that the transformation to DTO was called with the service result
    expect(to$($EntityName)DTO).toHaveBeenCalledWith($mockDto);

    // Ensure the result matches the expected DTO
    expect(result).toEqual($mockDto);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when $useCaseNameCamel execute method fails', async () => {
    // Simulate a failure when calling the service method
    $mockService.$useCaseNameCamel.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect($useCaseNameCamel.execute($formattedParameters)).rejects.toThrow('Service method error');
  });
});
"@
}


function Create-TestFile {
    param (
        [string]$fileName,
        [string]$content
    )
    Set-Content -Path $fileName -Value $content
}

try {
    $useCaseContent = Get-UseCaseContent -path $UseCasePath
    Write-Host "UseCase Content Read Successfully."

    $useCaseName = Get-UseCaseName -content $useCaseContent
    Write-Host "UseCase Name Extracted: $useCaseName"

    $useCaseTestsDir = "$(ConvertTo-KebabCase $EntityName).tests"
    Write-Host "Test Directory: $useCaseTestsDir"
    if (-not (Test-Path $useCaseTestsDir)) {
        New-Item -Path $useCaseTestsDir -ItemType Directory
        Write-Host "Created Directory: $useCaseTestsDir"
    }

    $methodMatches = Get-MethodDetails -content $useCaseContent
    Write-Host "Method Matches Found: $($methodMatches.Count)"

    foreach ($methodMatch in $methodMatches) {
        $methodName = $methodMatch.MethodName
        $parameters = $methodMatch.Parameters
        $returnType = $methodMatch.ReturnType

        Write-Host "Parameters : " $methodMatch.Parameters

        $fileName = "$useCaseTestsDir\$(ConvertTo-KebabCase $useCaseName).use-case.test.ts"
        Write-Host "Creating File: $fileName"

        $fileContent = Generate-FileContent -useCaseName $useCaseName -entityName $entityName -parameters $parameters -returnType $returnType
        Create-TestFile -fileName $fileName -content $fileContent
        Write-Host "File Created Successfully."
    }
}
catch {
    Write-Host "Error: $_"
}