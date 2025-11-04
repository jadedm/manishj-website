# CloudFront function to redirect www to non-www and handle Next.js static routing
resource "aws_cloudfront_function" "www_redirect" {
  name    = "${var.project_name}-www-redirect"
  runtime = "cloudfront-js-2.0"
  comment = "Redirect www to non-www and handle Next.js static export routing"
  publish = true
  code    = <<-EOT
function handler(event) {
  var request = event.request;
  var host = request.headers.host.value;
  var uri = request.uri;

  // Redirect www to non-www
  if (host.startsWith('www.')) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://' + host.substring(4) + uri }
      }
    };
  }

  // Handle Next.js static export routing
  // If URI doesn't have a file extension, append .html
  if (!uri.includes('.')) {
    if (uri.endsWith('/')) {
      request.uri = uri + 'index.html';
    } else {
      request.uri = uri + '.html';
    }
  }

  return request;
}
EOT
}
