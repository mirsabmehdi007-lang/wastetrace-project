export default `<div id="v"><div id="vb"><button data-v="iso">Overview</button><button data-v="top">Top</button><button data-v="front">Front</button><button data-v="encl">Lockers</button></div></div>
<div id="p"><h1>WasteTrace<small>3D simulator, Arduino Uno</small></h1>
<nav><button data-t="sim" class="on">Simulate</button><button data-t="wire">Wiring</button><button data-t="set">Customize</button></nav>
<section id="sim" class="tab"><div class="lcd" id="lcd"></div>
<div class="kp" id="kp"></div>
<div class="mu">Tap an RFID card on the reader:</div><div class="row" id="cards"></div>
<div class="row"><button id="pc">Power-cycle Uno</button><button id="rs">Erase EEPROM</button></div>
<div class="mu">EEPROM records (kept after power-cycle)</div><table id="sl"></table>
<div class="mu" style="margin-top:8px">Event log</div><div id="log"></div>
<div id="info" class="mu">Try it: A (deposit) → 1 → # · C → 1234 # → 1 # → tap Card A · B → 1 # → tap Card A → #. Click any 3D part or wire for details.</div></section>
<section id="wire" class="tab" hidden><div class="mu">30 wires. Click a row to highlight it in 3D, click again to clear. Show or hide a group:</div><div class="row" id="gr"></div><div id="wl"></div>
<div class="mu" style="margin-top:8px">Safety: RC522 runs on 3.3 V only. Use a level shifter or resistor dividers on SCK, MOSI, SDA and RST. Servos use the external 5 V supply, with its GND joined to the Uno GND.</div></section>
<section id="set" class="tab" hidden>
<label>Admin PIN (4 digits)</label><input type="text" id="pin" value="1234" maxlength="4" inputmode="numeric">
<label>Servo closed angle: <b id="cav">0</b>°</label><input type="range" id="ca" min="0" max="90" value="0">
<label>Servo open angle: <b id="oav">90</b>°</label><input type="range" id="oa" min="20" max="180" value="90">
<label>Door speed</label><input type="range" id="sp" min="1" max="20" value="6">
<label>Wire thickness</label><input type="range" id="th" min="3" max="14" value="6">
<div class="ck"><input type="checkbox" id="cl" checked>Component labels</div><div class="ck"><input type="checkbox" id="pl" checked>Pin labels</div>
<div class="ck"><input type="checkbox" id="ar">Auto-rotate</div><div class="ck"><input type="checkbox" id="gd" checked>Floor grid</div><div class="ck"><input type="checkbox" id="sn" checked>Buzzer sound</div>
<div class="ck"><input type="checkbox" id="en" checked>Show enclosure doors</div></section></div>`;
