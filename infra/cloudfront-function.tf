# CloudFront function to redirect www to non-www
resource "aws_cloudfront_function" "www_redirect" {
  name    = "${var.project_name}-www-redirect"
  runtime = "cloudfront-js-2.0"
  comment = "Redirect www to non-www"
  publish = true
  code    = <<-EOT
function handler(event) {
  var request = event.request;
  var host = request.headers.host.value;

  if (host.startsWith('www.')) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://' + host.substring(4) + request.uri }
      }
    };
  }

  return request;
}
EOT
}
