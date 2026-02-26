import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'], // Adjust these paths if you have internal routes
        },
        sitemap: 'https://www.anarva.online/sitemap.xml',
    }
}
