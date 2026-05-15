// Sparkle effect implementation
document.addEventListener('DOMContentLoaded', function ()
{
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas to full window size
    function resizeCanvas()
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Initialize canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Sparkle particles array
    const sparkles = [];

    // Sparkle class
    class Sparkle
    {
        constructor(x, y)
        {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 50 +10}, 100%, 80%)`;
            this.life = 100;
        }

        update()
        {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;
            this.size *= 0.95;
        }

        draw()
        {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life / 100/3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Create sparkles on mouse move
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;

    document.addEventListener('mousemove', function (e)
    {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseActive = true;

        // Create sparkles at mouse position
        for (let i = 0; i < 5; i++)
        {
            sparkles.push(new Sparkle(mouseX, mouseY));
        }
    });

    // Create sparkles on mouse enter
    document.addEventListener('mouseenter', function (e)
    {
        mouseActive = true;
    });

    // Create sparkles on mouse leave
    document.addEventListener('mouseleave', function (e)
    {
        mouseActive = false;
    });

    // Animation loop
    function animate()
    {
        // Clear canvas with a semi-transparent overlay for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw sparkles
        for (let i = 0; i < sparkles.length; i++)
        {
            sparkles[i].update();
            sparkles[i].draw();

            // Remove dead sparkles
            if (sparkles[i].life <= 0 || sparkles[i].size <= 0.5)
            {
                sparkles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
});