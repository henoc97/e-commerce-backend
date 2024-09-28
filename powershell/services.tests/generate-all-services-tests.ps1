# Path to the services directory
$servicesPath = "C:\Users\amavi\StudioProjects\ecommerce\e-commerce-backend\src\application\services"

# Path to the PowerShell script `create-services-test.ps1`
$scriptPath = "C:\Users\amavi\StudioProjects\ecommerce\e-commerce-backend\powershell\services.tests\create-services-tests.ps1"

# Get all *.service.ts files in the services directory
$serviceFiles = Get-ChildItem -Path $servicesPath -Filter "*.service.ts"

function ConvertTo-PascalCase([Parameter(ValueFromPipeline)] [string] $text) {
    ($text -split '-' | ForEach-Object {
        "$($_.ToCharArray()[0].ToString().ToUpper())$($_.Substring(1))" }) -join ''
}

# Iterate through each service file and execute the create-services.ps1 script
foreach ($file in $serviceFiles) {
    # Extract the service name (remove the .service.ts extension)
    $serviceName = $file.BaseName -replace '\.service$', ''

    $serviceName = ConvertTo-PascalCase $serviceName

    # Build the relative path of the service 
    $servicePath = "../../src/application/services/$($file.Name)"

    # Execute the create-services-tests.ps1 script for each service
    Write-Host "Executing for $serviceName with  $servicePath"

    & $scriptPath -serviceName $serviceName -servicePath $servicePath
}
