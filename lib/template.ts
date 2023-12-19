export const TEMPLATE = `
  <h1>
    <span>Fontable</span>
    <input type="checkbox" id="toggle" />
    <label for="toggle" class="toggle-label">Enabled</label>
        <input type="checkbox" id="override" />
    <label for="override" class="toggle-label">Override</label>
  </h1>
  <div class="content">
  
  <div class="flex">
    <select id="group-select"></select>
    <select id="font-select"></select>    
<!--    <a id="google-link" href="" target="_blank">View in Google Fonts</a>-->
  </div>
  <div class="instr">
    <span id="instr1"><span>&#10003;</span> copy link</span>
    <span id="instr2"><span>&#10003;</span> copy css</span>
    <span id="google-link"><span>&#10003;</span> google fonts</span>
  </div>
  </div>

  <style>
    
    h1 {
      margin: 0;
      display: inline-block;
      font-size: 20px;
    }
    
    input[type="checkbox"] {
      margin-left: 20px;
    }
    
    .toggle-label {
      font-size: 14px;
      vertical-align: middle;
    }
    
    .flex {
      display: flex;
      align-items: baseline;
    }
    
    select {
      margin-top: 10px;
      padding: 10px;
      border-radius: 5px;
      border: none;
      background-color: #222;
      color: #eee;
    }
    
    select:focus-visible {
      outline: 1px solid #888;
    }
    
    select + select {
      margin-left: 10px;
    }
    
    select option {
      background-color: #333;
      color: #eee;
      padding: 5px 5px;
    }
    
    .instr {
      margin-top: 10px;
      font-size: 14px;
      display: flex;
      gap: 20px;
    }
    
    .instr > span {
      cursor: pointer;
    }
    
    .instr > span > span {
      visibility: hidden;
    }
    
    a {
      color: inherit;
      margin-left: 20px;
    }
    
    .content {
      display: none;
    }
    
    .fontable {
      position: fixed;
      bottom: 0;   
      right: 0;
      background-color: #333;
      border: 1px solid #333;
      box-shadow: 0 0 5px #111;
      color: #eee;
      width: 350px;
      padding: 10px 20px;
      font-family: monospace !important;
      z-index: 9999;
    }
  
    .fontable.enabled .content {
      display: block;
    }
  </style>
`;
