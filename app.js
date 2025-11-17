// ... dentro de la función draw() ...

    ctx.beginPath();
    ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
    
    // CAMBIO AQUÍ: Color de los puntos (Cyan/Turquesa Neon)
    ctx.fillStyle = "#64ffda"; 
    
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(100, 255, 218, 0.5)";
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Draw lines
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      // ... cálculo de distancia ...
      if (dist < 140) {
        const opacity = 1 - dist / 140;

        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        
        // CAMBIO AQUÍ: Color de las líneas
        ctx.strokeStyle = `rgba(100, 255, 218, ${opacity * 0.2})`; 
        
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
// ... resto del código
