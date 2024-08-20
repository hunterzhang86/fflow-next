const locales = ['en', 'cn'];

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}