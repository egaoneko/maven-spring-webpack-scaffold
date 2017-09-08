<%@ page language="java" contentType="text/html; charset=utf-8" %>
<!DOCTYPE>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>App1</title>
        <link rel="stylesheet" href="resources/static/dist/css/app2/entry.css">
    </head>

    <body>
        <div class="center">
            <h2>App1</h2>
            <h2>
                ${message}
            </h2>
        </div>
        <script src="resources/static/dist/js/vendors.bundle.js"></script>
        <script src="resources/static/dist/js/app1/entry.bundle.js"></script>
        <script>
            window.addEventListener('load', function(){
                sc.init(sc.name);
            });
        </script>
    </body>
</html>
