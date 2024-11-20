# Définir le chemin du dossier contenant les fichiers
$folderPath = "C:\Users\amavi\projects-studio\ecommerce\e-commerce-backend\src\presentation\graphql\output"

# Vérifier si le dossier existe
if (Test-Path $folderPath) {
    # Obtenir tous les fichiers dans le dossier avec l'extension .dto.ts
    $files = Get-ChildItem -Path $folderPath -Filter "*.dto.ts"

    # Parcourir chaque fichier et renommer
    foreach ($file in $files) {
        # Construire le nouveau nom de fichier
        $newName = $file.Name -replace "\.dto\.ts$", ".output.ts"
        
        # Renommer le fichier
        Rename-Item -Path $file.FullName -NewName $newName

        Write-Host "Renommé : $($file.Name) -> $newName"
    }

    Write-Host "Renommage terminé."
} else {
    Write-Host "Le dossier spécifié n'existe pas : $folderPath"
}
