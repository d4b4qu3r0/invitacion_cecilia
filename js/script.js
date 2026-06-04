  /*  Enlace del formulario  */
  document.getElementById('rsvp').href = CONFIG.googleForm;
  document.getElementById('mapa').href = CONFIG.ubicacion;

  /*  Audio  */
  const audio = document.getElementById('audio');
  const btnMusica = document.getElementById('btn-musica');
  audio.src = CONFIG.musica;
  let sonando = false;

  function toggleMusica(){
    if(sonando){ audio.pause(); btnMusica.classList.add('silencio'); }
    else { audio.play().catch(()=>{}); btnMusica.classList.remove('silencio'); }
    sonando = !sonando;
  }
  btnMusica.addEventListener('click', toggleMusica);

  /*  Abrir el sobre  */
  const portada = document.getElementById('portada');
  const tarjeta = document.getElementById('tarjeta');
  function abrir(){
    portada.classList.add('oculto');
    tarjeta.classList.add('entra');
    // intentar reproducir música tras la interacción del usuario
    audio.play().then(()=>{ sonando=true; btnMusica.classList.remove('silencio'); }).catch(()=>{});
    portada.removeEventListener('click', abrir);
  }
  portada.addEventListener('click', abrir);

  /*  Cuenta regresiva  */
  const destino = CONFIG.fechaEvento.getTime();
  const $dias=document.getElementById('dias'), $horas=document.getElementById('horas'),
        $min=document.getElementById('min'), $seg=document.getElementById('seg');

  function dos(n){return String(n).padStart(2,'0');}

  function tic(){
    const ahora = Date.now();
    let dif = destino - ahora;
    if(dif <= 0){
      document.getElementById('reloj').style.display='none';
      document.querySelector('.cuenta-titulo').style.display='none';
      document.getElementById('mensaje-final').style.display='block';
      clearInterval(intervalo);
      return;
    }
    const d = Math.floor(dif/86400000); dif-=d*86400000;
    const h = Math.floor(dif/3600000);  dif-=h*3600000;
    const m = Math.floor(dif/60000);     dif-=m*60000;
    const s = Math.floor(dif/1000);
    $dias.textContent=dos(d); $horas.textContent=dos(h);
    $min.textContent=dos(m);  $seg.textContent=dos(s);
  }
  tic();
  const intervalo = setInterval(tic,1000);

  /*  Pétalos que caen  */
  const lluvia = document.getElementById('lluvia');
  const colores = ['#f4c4d4','#ec9fb8','#e07ca0','#cdaee0','#b189d1'];
  function crearPetalo(){
    const p = document.createElement('div');
    p.className='petalo';
    const size = 8 + Math.random()*12;
    const color = colores[Math.floor(Math.random()*colores.length)];
    p.style.left = Math.random()*100 + 'vw';
    p.style.animationDuration = (7 + Math.random()*7) + 's';
    p.style.animationDelay = (Math.random()*5) + 's';
    p.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 20 20">
      <path d="M10 1 C14 5 18 9 10 19 C2 9 6 5 10 1Z" fill="${color}" opacity="0.85"/></svg>`;
    lluvia.appendChild(p);
    setTimeout(()=>p.remove(), 16000);
  }
  // generador continuo
  for(let i=0;i<14;i++) crearPetalo();
  setInterval(crearPetalo, 900);