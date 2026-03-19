<template>
    <div class="app">
        <!-- Hero 区域 -->
        <header class="header">
            <nav class="nav">
                <div class="logo">
                    <span class="logo-icon">📱</span>
                    <span class="logo-text">ClipQR</span>
                </div>
                <a href="https://github.com/xingwangzhe/ClipQR" target="_blank" class="github-link">
                    GitHub
                </a>
            </nav>

            <div class="hero">
                <div class="hero-content">
                    <h1 class="title">ClipQR</h1>
                    <p class="subtitle">快捷二维码解析工具</p>
                    <p class="description">
                        基于 Tauri + Vue 3 开发的跨平台桌面应用<br>
                        快速读取剪贴板和本地图片中的二维码内容
                    </p>
                    <div class="download-buttons">
                        <a href="https://github.com/xingwangzhe/ClipQR/releases" target="_blank"
                            class="btn btn-primary">
                            立即下载
                        </a>
                        <a href="#features" class="btn btn-secondary">
                            了解更多
                        </a>
                    </div>
                </div>
                <!-- 主截图 -->
                <div class="hero-image">
                    <img src="/应用截图.png" alt="ClipQR 应用截图" />
                </div>
            </div>
        </header>

        <!-- 功能特性 -->
        <section id="features" class="features">
            <div class="container">
                <h2 class="section-title">✨ 功能特性</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">📋</div>
                        <h3>剪贴板直读</h3>
                        <p>直接读取剪贴板中的图片，一键解析二维码</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📁</div>
                        <h3>本地文件</h3>
                        <p>支持从本地图片文件中解析二维码</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🖱️</div>
                        <h3>拖拽解析</h3>
                        <p>支持拖拽图片文件到窗口直接解析</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🚀</div>
                        <h3>快速响应</h3>
                        <p>使用 Rust 高性能解析，瞬间出结果</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📎</div>
                        <h3>一键复制</h3>
                        <p>点击即可复制解析结果到剪贴板</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🌐</div>
                        <h3>自动打开链接</h3>
                        <p>识别到 URL 自动打开浏览器</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 演示视频区域 -->
        <section class="demo-section">
            <div class="container">
                <h2 class="section-title">🎬 演示视频</h2>
                <!-- 演示视频 -->
                <div class="video-container">
                    <video controls poster="/应用截图.png">
                        <source src="/演示视频.mp4" type="video/mp4">
                        你的浏览器不支持视频播放。
                    </video>
                </div>
            </div>
        </section>

        <!-- 使用场景 -->
        <section class="use-cases">
            <div class="container">
                <h2 class="section-title">🎯 使用场景</h2>
                <ul class="use-cases-list">
                    <li>快捷解析截图中的二维码，无需打开手机</li>
                    <li>保存二维码图片后快速提取内容</li>
                    <li>开发过程中快速验证生成的二维码</li>
                    <li>提取文档或网页截图中的二维码信息</li>
                </ul>
            </div>
        </section>

        <!-- 下载区域 -->
        <section class="download-section">
            <div class="container">
                <h2 class="section-title">📥 立即下载</h2>
                <p class="download-text">前往 GitHub Releases 页面下载对应平台的最新版本</p>
                <div class="download-buttons-center">
                    <a href="https://github.com/xingwangzhe/ClipQR/releases" target="_blank"
                        class="btn btn-primary large">
                        下载最新版本
                    </a>
                </div>
            </div>
        </section>

        <!-- 页脚 -->
        <footer class="footer">
            <div class="container">
                <p>
                    <a href="https://github.com/xingwangzhe/ClipQR" target="_blank">GitHub</a> • MIT License
                </p>
                <p class="copyright">©2026-now ClipQR. Made with ❤️</p>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.app {
    min-height: 100vh;
    background: #0a0a0a;
    color: #ffffff;
}

.header {
    padding: 0;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
}

.logo-icon {
    font-size: 1.8rem;
}

.github-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: background 0.2s;
}

.github-link:hover {
    background: #1a1a1a;
}

.hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
    align-items: center;
}

.hero-content {
    text-align: left;
}

.title {
    font-size: 4rem;
    font-weight: bold;
    margin: 0 0 1rem;
    background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.subtitle {
    font-size: 1.5rem;
    color: #a0aec0;
    margin: 0 0 1.5rem;
    font-weight: normal;
}

.description {
    font-size: 1.125rem;
    color: #718096;
    line-height: 1.8;
    margin: 0 0 2.5rem;
}

.download-buttons {
    display: flex;
    gap: 1rem;
}

.download-buttons-center {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.btn {
    display: inline-block;
    padding: 0.875rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
}

.btn.large {
    padding: 1rem 2.5rem;
    font-size: 1.125rem;
}

.btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
    background: #1a1a1a;
    color: white;
    border: 1px solid #2d2d2d;
}

.btn-secondary:hover {
    background: #2d2d2d;
}

.hero-image {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.hero-image img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.features {
    padding: 6rem 0;
    background: #0f0f0f;
}

.section-title {
    text-align: center;
    font-size: 2rem;
    margin: 0 0 3rem;
    color: #fff;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: #1a1a1a;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    transition: transform 0.2s, background 0.2s;
    border: 1px solid #2d2d2d;
}

.feature-card:hover {
    transform: translateY(-4px);
    background: #202020;
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-card h3 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
    color: #fff;
}

.feature-card p {
    color: #718096;
    line-height: 1.6;
    margin: 0;
}

.demo-section {
    padding: 6rem 0;
    background: #0a0a0a;
}

.video-container {
    max-width: 900px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    background: #000;
    aspect-ratio: 16 / 9;
}

.video-container video {
    width: 100%;
    height: 100%;
    display: block;
}

.use-cases {
    padding: 6rem 0;
    background: #0a0a0a;
}

.use-cases-list {
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    gap: 1rem;
    padding: 0;
}

.use-cases-list li {
    list-style: none;
    padding: 1rem 1.5rem;
    background: #1a1a1a;
    border-radius: 8px;
    color: #a0aec0;
    font-size: 1.125rem;
    border-left: 4px solid #3b82f6;
}

.download-section {
    padding: 6rem 0;
    background: #0f0f0f;
}

.download-text {
    text-align: center;
    color: #718096;
    font-size: 1.125rem;
    margin: 0 0 2.5rem;
}

.footer {
    padding: 3rem 0;
    background: #050505;
    text-align: center;
    color: #718096;
}

.footer a {
    color: #a0aec0;
    text-decoration: none;
}

.footer a:hover {
    color: #3b82f6;
}

.copyright {
    margin: 1rem 0 0;
    font-size: 0.875rem;
}

@media (max-width: 968px) {
    .hero {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem 1rem 4rem;
    }

    .title {
        font-size: 2.5rem;
    }

    .nav {
        padding: 1rem;
    }

    .features,
    .demo-section,
    .use-cases,
    .download-section {
        padding: 3rem 0;
    }
}
</style>
