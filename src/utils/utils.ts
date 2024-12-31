export const getSrc = (code: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        margin: 0;
        padding: 16px;
        font-family: Arial, sans-serif;
      }
      .error {
        color: #ef4444;
        padding: 8px;
        border-radius: 4px;
        background: #fef2f2;
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script>
      const originalConsole = console.log;
      console.log = (...args) => {
        originalConsole.apply(console, args);
        const output = args
          .map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg))
          .join(' ');
        document.body.insertAdjacentHTML('beforeend', 
          '<pre style="background:#f3f4f6;padding:8px;margin:4px 0;border-radius:4px;">' + 
          output + '</pre>'
        );
      };

      try {
        ${code}
      } catch (error) {
        document.body.insertAdjacentHTML('beforeend', 
          '<pre class="error">Error: ' + error.message + '</pre>'
        );
      }
    </script>
  </body>
</html>
`;
