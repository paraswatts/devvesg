{{/*
Expand the name of the chart.
*/}}
{{- define "backend.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "backend.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "backend.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "backend.labels" -}}
helm.sh/chart: {{ include "backend.chart" . }}
{{ include "backend.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "backend.selectorLabels" -}}
app.kubernetes.io/name: {{ include "backend.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "backend.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "backend.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Create a label configuration that can be re-used across pod templates
*/}}
{{- define "backend.datadogLabels" -}}
tags.datadoghq.com/env: {{ .Values.env }}
tags.datadoghq.com/service: backend
tags.datadoghq.com/version: {{ .Values.image.tag }}
{{- end -}}

{{/*
Common environment variables that don't need to be per-deployment
*/}}
{{- define "backend.commonEnvironment" -}}
- name: DD_ENV
  valueFrom:
    fieldRef:
      fieldPath: metadata.labels['tags.datadoghq.com/env']
- name: DD_SERVICE
  valueFrom:
    fieldRef:
      fieldPath: metadata.labels['tags.datadoghq.com/service']
- name: DD_VERSION
  valueFrom:
    fieldRef:
      fieldPath: metadata.labels['tags.datadoghq.com/version']
- name: LOG_LEVEL
  value: verbose
- name: S3_BUCKET_NAME
  value: {{ .Values.s3.imagesBucket | quote }}
{{- end }}

{{/*
Common environment variables from secrets
*/}}
{{- define "backend.commonEnvironmentFrom" -}}
envFrom:
  - secretRef:
      name: {{ include "backend.fullname" . }}
  - secretRef:
      name: database-creds
{{- end }}
