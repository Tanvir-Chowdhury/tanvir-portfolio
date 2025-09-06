# Append a single space to the end of common text files in the repo
# Run from the repository root: .\scripts\add_trailing_space.ps1

$extensions = @(
  '*.ts','*.tsx','*.js','*.jsx','*.json','*.jsonc','*.css','*.scss','*.html','*.md','*.mdx','*.txt','*.yml','*.yaml','*.xml','*.py','*.java','*.rb','*.go','*.rs','*.ps1','*.sh','*.tsx','.env','*.lock','*.config.js','*.config.ts'
)

# Build list of files to modify
$files = Get-ChildItem -Path . -Recurse -File -Include $extensions -ErrorAction SilentlyContinue | Where-Object {
    # skip node_modules, .git, dist, build, and binary directories
    $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\.git\\' -and $_.FullName -notmatch '\\dist\\' -and $_.FullName -notmatch '\\build\\' -and $_.FullName -notmatch '\\.cache\\'
}

Write-Host "Found $($files.Count) candidate files. Preparing to append a single trailing space to each file's EOF."

foreach ($file in $files) {
    try {
        $content = Get-Content -Raw -LiteralPath $file.FullName -ErrorAction Stop
        if ($content.Length -eq 0) {
            # file empty â€” write a single space
            Set-Content -LiteralPath $file.FullName -Value ' ' -Encoding UTF8
            Write-Host "Wrote space to empty file: $($file.FullName)"
            continue
        }

        # If file already ends with whitespace (space/newline), append a single space anyway
        $newContent = $content + ' '
        Set-Content -LiteralPath $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Appended space to: $($file.FullName)"
    } catch {
        Write-Warning "Failed to modify $($file.FullName): $_"
    }
}

Write-Host "Done. Please review changes and commit them if correct."
 
