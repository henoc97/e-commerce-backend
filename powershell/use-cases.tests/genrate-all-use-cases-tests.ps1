# Path to the use-cases directory
$useCasesPath = "C:\Users\amavi\StudioProjects\ecommerce\e-commerce-backend\src\application\use-cases"

# Path to the PowerShell script `create-use-cases-tests.ps1`
$scriptPath = "C:\Users\amavi\StudioProjects\ecommerce\e-commerce-backend\powershell\use-cases.tests\create-use-cases-tests.ps1"


function ConvertTo-PascalCase([Parameter(ValueFromPipeline)] [string] $text) {
    ($text -split '-' | ForEach-Object {
        "$($_.ToCharArray()[0].ToString().ToUpper())$($_.Substring(1))" }) -join ''
}
# Get all *.use-cases folders in the use-cases directory
$useCasesFolders = Get-ChildItem -Path $useCasesPath -Filter "*.use-cases"

# Iterate through each service file and execute the create-services.ps1 script
foreach ($folder in $useCasesFolders) {

    # Build the relative path of the service interface
    $useCasesPath = "../../src/application/use-cases/$($folder.Name)"
    
    # Get all *.use-case.ts files in the .use-cases directory
    $useCasesfiles = Get-ChildItem -Path $useCasesPath -Filter "*.use-case.ts"
    
    foreach ($file in $useCasesfiles) {
        # Build the relative path of the service interface
        $UseCasePath = "../../src/application/use-cases/$($folder.Name)/$($file.Name)"

        $withoutExtension = $folder.Name -split '\.' | Select-Object -First 1

        # Execute the create-use-casestest.ps1 script for each use case
        Write-Host "Executing for $UseCasePath"

        & $scriptPath -UseCasePath $UseCasePath -EntityName $(ConvertTo-PascalCase $withoutExtension)
    }

}
