export function ThemeScript() {
  const code = `
    (function() {
      try {
        var theme = localStorage.getItem('fermor-theme');
        var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (theme === 'dark' || (!theme && supportDarkMode)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
