import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..', 'public', 'images', 'proyectos');

const sites = [
    {
        name: 'ypfelpuente',
        url: 'https://ypfelpuente.netlify.app/',
        initials: 'YPF'
    },
    {
        name: 'guenumil',
        url: 'https://juanguenumil.com.ar/',
        initials: 'JG'
    },
    {
        name: 'rcplay',
        url: 'https://rcplay.com.ar/',
        initials: 'RC'
    }
];

const viewports = {
    desktop: { width: 1920, height: 1080 },
    mobile: { width: 390, height: 844 }
};

async function captureVideo(browser, site, viewport, type) {
    const context = await browser.newContext({
        viewport,
        recordVideo: {
            dir: outputDir,
            size: viewport
        }
    });

    const page = await context.newPage();
    
    try {
        console.log(`Capturing ${site.name} ${type}...`);
        
        await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
        
        // Wait for content to load
        await page.waitForTimeout(1500);
        
        // Smooth scroll down and up to show the site in action
        await page.evaluate(async () => {
            const scrollStep = window.innerHeight / 2;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            
            // Scroll down smoothly
            for (let pos = 0; pos < maxScroll; pos += scrollStep) {
                window.scrollTo({ top: pos, behavior: 'smooth' });
                await new Promise(resolve => setTimeout(resolve, 300));
            }
            
            // Wait at bottom
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Scroll back to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            await new Promise(resolve => setTimeout(resolve, 500));
        });
        
        // Record for 2 more seconds
        await page.waitForTimeout(2000);
        
    } catch (error) {
        console.error(`Error capturing ${site.name} ${type}:`, error.message);
    }
    
    await context.close();
    
    // Rename the video file
    const videoFiles = await import('fs').then(fs => 
        fs.promises.readdir(outputDir).then(files => 
            files.filter(f => f.endsWith('.webm') && f.includes('record'))
        )
    );
    
    if (videoFiles.length > 0) {
        const oldPath = path.join(outputDir, videoFiles[0]);
        const newPath = path.join(outputDir, `${site.name}-${type}.webm`);
        await import('fs').then(fs => fs.promises.rename(oldPath, newPath));
        console.log(`✓ Saved: ${site.name}-${type}.webm`);
    }
}

async function main() {
    console.log('Starting video capture...\n');
    
    const browser = await chromium.launch({ headless: true });
    
    for (const site of sites) {
        // Desktop
        await captureVideo(browser, site, viewports.desktop, 'hero');
        
        // Mobile
        await captureVideo(browser, site, viewports.mobile, 'mobile');
    }
    
    await browser.close();
    console.log('\n✓ All videos captured successfully!');
}

main().catch(console.error);
