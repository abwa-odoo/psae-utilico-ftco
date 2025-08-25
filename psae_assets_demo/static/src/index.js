/** @odoo-module **/

import { Component, useState, onMounted, mount, whenReady, xml } from "@odoo/owl";

class HelloApp extends Component {
    static template = xml`
        <div class="page-demo">
          <h1>OWL Bundle Demo</h1>
          <p>Isolated bundle: <code>psae_assets_demo.utilico_assets</code></p>

          <div class="card">
            <p t-esc="'Count: ' + state.count"/>
            <button class="btn" t-on-click="inc">Increment</button>
            <button class="btn outline" t-on-click="reset">Reset</button>
          </div>

          <div class="log">
              <p t-foreach="state.logs" t-as="l" t-key="l"><t t-esc="l"/></p>
          </div>
        </div>
    `;

    setup() {
        this.state = useState({count: 0, logs: []});
        onMounted(() => {
            this._log("Mounted OWL component from custom bundle");
        });
    }

    inc() {
        this.state.count += 1;
        this._log(`Increment → ${this.state.count}`);
    }

    reset() {
        this.state.count = 0;
        this._log("Reset ↩︎ 0");
    }

    _log(msg) {
        this.state.logs = [...this.state.logs, `[${new Date().toLocaleTimeString()}] ${msg}`];
        // keep last 6
        if (this.state.logs.length > 6) {
            this.state.logs.shift();
        }
    }
}

// Wait for DOM, then mount onto #owl-root (provided by template)
whenReady(async () => {
    const root = document.getElementById("owl-root");
    if (root) {
        await mount(HelloApp, root);
        console.log("[my_bundle_demo] OWL app mounted");
    } else {
        console.warn("[my_bundle_demo] #owl-root not found");
    }
});
