// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    initCarousel();
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    // 初始化响应式导航
    initResponsiveNav();
    
    // 初始化图书卡片交互
    initBookCards();
    
    // 初始化表单提交
    initFormSubmission();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化滚动显示动画
    initScrollAnimation();
});

// 轮播图功能
function initCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    
    if (carouselItems.length > 0) {
        // 自动轮播
        setInterval(() => {
            carouselItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % carouselItems.length;
            carouselItems[currentIndex].classList.add('active');
        }, 5000);
    }
}

// 平滑滚动功能
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 响应式导航功能
function initResponsiveNav() {
    // 检测窗口大小变化
    window.addEventListener('resize', function() {
        adjustNavbar();
    });
    
    // 初始调整
    adjustNavbar();
}

function adjustNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
}

// 图书卡片交互功能
function initBookCards() {
    const bookItems = document.querySelectorAll('.book-item');
    
    bookItems.forEach(item => {
        // 添加悬停效果
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 添加点击事件
        item.addEventListener('click', function() {
            const bookTitle = this.querySelector('h3').textContent;
            alert(`您点击了图书：${bookTitle}\n更多详情功能开发中...`);
        });
    });
}

// 表单提交功能（如果有表单的话）
function initFormSubmission() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = '#ccc';
                }
            });
            
            if (isValid) {
                // 模拟表单提交
                alert('表单提交成功！我们会尽快与您联系。');
                this.reset();
            } else {
                alert('请填写所有必填字段。');
            }
        });
    });
}

// 页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// 搜索功能（如果有搜索框的话）
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`搜索关键词：${searchTerm}\n搜索功能开发中...`);
            } else {
                alert('请输入搜索关键词。');
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`搜索关键词：${searchTerm}\n搜索功能开发中...`);
                } else {
                    alert('请输入搜索关键词。');
                }
            }
        });
    }
}

// 滚动显示动画功能
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFadeElements() {
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.8) {
                element.classList.add('visible');
            }
        });
    }
    
    // 初始检查
    checkFadeElements();
    
    // 滚动时检查
    window.addEventListener('scroll', checkFadeElements);
}

// 样书预览功能（模态框方式）
function openPreview(bookType) {
    const modal = document.getElementById('previewModal');
    const title = document.getElementById('previewTitle');
    const content = document.getElementById('previewContent');
    
    // 设置预览内容为PDF文件
    title.textContent = '反薛晶晶宣言 - 样书预览';
    
    // 生成PDF预览
    let previewHTML = `
        <div class="pdf-preview">
            <img src="pdf-fille/pic1.png" alt="反薛晶晶宣言封面" style="width: 100%; margin-bottom: 20px;">
            <iframe src="pdf-fille/1.pdf" width="100%" height="500px" style="border: none;"></iframe>
        </div>
    `;
    
    content.innerHTML = previewHTML;
    modal.style.display = 'flex';
}

// PDF预览功能（使用HTML5 iframe在新页面打开）
function openPdfPreview(bookId) {
    // 创建一个新窗口
    const previewWindow = window.open('', '_blank');
    
    // 根据bookId选择对应的PDF文件和标题
    let pdfUrl, bookTitle;
    if (bookId === '2') {
        pdfUrl = 'pdf-fille/2.pdf';
        bookTitle = '鲁中国际学校法庭判决书';
    } else {
        // 默认显示第一本书
        pdfUrl = 'pdf-fille/1.pdf';
        bookTitle = '反薛晶晶宣言';
    }
    
    // 在新窗口中使用iframe嵌入PDF
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${bookTitle} - PDF预览</title>
            <style>
                body, html {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    font-family: 'Microsoft YaHei', Arial, sans-serif;
                }
                .pdf-container {
                    width: 100%;
                    height: 100%;
                }
                .pdf-container iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
                .header {
                    background-color: #0066cc;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    font-size: 18px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="header">${bookTitle} - PDF预览</div>
            <div class="pdf-container">
                <iframe src="${pdfUrl}" type="application/pdf">
                    <p>您的浏览器不支持PDF预览，请<a href="${pdfUrl}">点击这里下载PDF文件</a>。</p>
                </iframe>
            </div>
        </body>
        </html>
    `);
    
    // 关闭文档流
    previewWindow.document.close();
}

function closePreview() {
    const modal = document.getElementById('previewModal');
    modal.style.display = 'none';
}

// 点击模态框外部关闭预览
window.onclick = function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target == modal) {
        closePreview();
    }
}