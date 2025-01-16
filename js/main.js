const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const languageSelect = document.getElementById('languageSelect');

// 从 localStorage 获取语言设置，默认为英文
const currentLang = localStorage.getItem('language') || 'en';

// 设置选择器的初始值
languageSelect.value = currentLang;

// 监听语言选择变化
languageSelect.addEventListener('change', function() {
    const selectedLang = this.value;
    localStorage.setItem('language', selectedLang);
    switchLanguage(selectedLang);
});

// 切换语言显示
function switchLanguage(lang) {
    const enElements = document.querySelectorAll('[id$="-en"]');
    const zhElements = document.querySelectorAll('[id$="-zh"]');
    
    if (lang === 'en') {
        enElements.forEach(el => el.classList.remove('hidden'));
        zhElements.forEach(el => el.classList.add('hidden'));
    } else {
        zhElements.forEach(el => el.classList.remove('hidden'));
        enElements.forEach(el => el.classList.add('hidden'));
    }
}

// 初始化语言设置
switchLanguage(currentLang);

// 设置画布大小
canvas.width = 800;
canvas.height = 1100;

// 加载模板图片 (使用 template-image.js 中定义的 templateBase64)
const templateImg = new Image();
templateImg.onload = function() {
    drawTemplate();
};
// 直接使用 template-image.js 中定义的 templateBase64 变量
templateImg.src = templateBase64;  // 这里不需要重新声明，直接使用

function drawTemplate() {
    // 填充白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制模板
    ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const uploadedImg = new Image();
        uploadedImg.onload = function() {
            // 重绘模板
            drawTemplate();
            
            // 计算图片位置和大小
            const targetX = 580;      // 右上角X坐标
            const targetY = 100;      // 右上角Y坐标
            const targetWidth = 250;  // 目标宽度
            const targetHeight = 200; // 目标高度

            // 计算缩放比例并保持宽高比
            let { width, height } = calculateAspectRatioFit(
                uploadedImg.width,
                uploadedImg.height,
                targetWidth,
                targetHeight
            );

            // 绘制上传的图片
            ctx.drawImage(uploadedImg, targetX, targetY, width, height);

            // 启用下载按钮
            downloadBtn.disabled = false;
        };
        uploadedImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// 计算等比例缩放尺寸
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
        width: srcWidth * ratio,
        height: srcHeight * ratio
    };
}

// 下载功能
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    const filename = languageSelect.value === 'en' ? 'cat_tax_certificate.png' : '猫税确认单.png';
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
}); 