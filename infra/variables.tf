variable "domain_name" {
  description = "Primary domain name for the website"
  type        = string
  default     = "manishj.com"
}

variable "region" {
  description = "AWS region for resources"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "manishj-website"
}

variable "environment" {
  description = "Environment (dev/staging/prod)"
  type        = string
  default     = "prod"
}
