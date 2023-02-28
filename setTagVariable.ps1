$VariableGroupId = 1
$NewValue = $env:TAG
$VariableName = "reactivitiesContainerTag"
Write-Host "NewValue : $NewValue"
$url = "$($env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI)$env:SYSTEM_TEAMPROJECTID/_apis/distributedtask/variablegroups/$($VariableGroupId)?api-version=5.1-preview.1"
Write-Host "URL: $url"
$authHeader = @{Authorization = "Bearer $env:SYSTEM_ACCESSTOKEN"}
$definition = Invoke-RestMethod -Uri $url -Headers $authHeader
Write-Host "Pipeline = $($definition | ConvertTo-Json -Depth 100)"
$definition.variables.$VariableName.Value = "$($NewValue)"
$definitionJson = $definition | ConvertTo-Json -Depth 100 -Compress
Invoke-RestMethod -Method Put -Uri $url -Headers $authHeader -ContentType "application/json" -Body ([System.Text.Encoding]::UTF8.GetBytes($definitionJson)) | Out-Null