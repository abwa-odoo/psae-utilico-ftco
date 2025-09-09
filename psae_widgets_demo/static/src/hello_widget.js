/** @odoo-module **/
import { Component, useState, useRef, onWillStart, onMounted, onWillUnmount } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class HelloWidget extends Component {
    static template = "psae_widgets_demo.HelloWidget";

    /**
     * Component setup method - initializes services, state, and lifecycle hooks
     * Why these choices were made:
     * - useService("orm"): Provides access to Odoo's ORM for backend data operations
     * - useState with users/selectedUser: Manages user dropdown state reactively
     * - onWillStart with loadUsers(): Ensures users are loaded before first render
     * - Async onWillStart: Prevents UI rendering until data is available
     * - Original counter/ticks: Preserves existing demo functionality
     */
    setup() {
        // Initialize ORM service for backend communication
        this.orm = useService("orm");
        this.selectRef = useRef("userSelect");

        // Setup reactive state management
        this.state = useState({
            counter: 0,           // Original demo counter
            ticks: 0,             // Original demo timer
            users: [],            // Array to store fetched user records
            selectedUser: null    // Currently selected user object
        });

        // Load users before component renders to avoid empty dropdown
        onWillStart(async () => {
            this.state.counter = 1;
            await this.loadUsers();  // Fetch users from backend
        });

        // Start timer after component is mounted to DOM
        onMounted(() => {
            this._interval = setInterval(() => {
                this.state.ticks++;
            }, 1000);
            
            // Initialize Select2 on the user dropdown
            this.initializeSelect2();
        });

        // Cleanup timer when component is destroyed to prevent memory leaks
        onWillUnmount(() => {
            if (this._interval) clearInterval(this._interval);
            // Cleanup Select2 instance
            this.destroySelect2();
        });
    }

    increment() {
        this.state.counter++;
    }

    decrement() {
        this.state.counter--;
    }

    /**
     * Loads active users from the backend using ORM service
     * 
     * Implementation decisions:
     * - Uses searchRead() instead of search() + read() for efficiency (single RPC call)
     * - Filters by [["active", "=", true]] to only show active users
     * - Only fetches ["id", "name"] fields to minimize data transfer
     * - Auto-selects first user for better UX (avoids empty selection state)
     * - Includes error handling to prevent crashes on network/permission issues
     */
    async loadUsers() {
        try {
            // Fetch active users with minimal required fields
            const users = await this.orm.searchRead(
                "res.users",                    // Model name
                [["active", "=", true]],        // Domain filter for active users only
                ["id", "name"]                  // Fields to fetch (minimal for performance)
            );

            // Update state with fetched users
            this.state.users = users;

            // Auto-select first user for better UX (prevents empty selection)
            if (users.length > 0) {
                this.state.selectedUser = users[0];
            }
        } catch (error) {
            // Log errors but don't crash the component
            console.error("Error loading users:", error);
        }
    }

    /**
     * Initialize Select2 on the user dropdown
     * 
     * Implementation details:
     * - Uses jQuery to initialize Select2 on the select element
     * - Configures Select2 with placeholder and width settings
     * - Binds change event to handle user selection
     * - Ensures proper integration with OWL component lifecycle
     */
    initializeSelect2() {
        const $el = $(this.selectRef.el);
        if (this.selectRef.el && window.$ && window.$.fn.select2) {
            // Initialize Select2 with configuration
            $el.select2({
                placeholder: "Select a user...",
                width: '100%',
                allowClear: false
            });

            // Bind change event for Select2
            $el.on('change', (event) => {
                this.onUserSelect(event);
            });
        } else {
            console.error("Select2 is not loaded");
        }
    }

    /**
     * Cleanup Select2 instance
     * 
     * Why this is important:
     * - Prevents memory leaks by destroying Select2 instance
     * - Removes event listeners to avoid orphaned handlers
     * - Ensures clean component destruction
     */
    destroySelect2() {
        if (this.selectRef.el && window.$ && window.$.fn.select2) {
            // Destroy Select2 instance and remove event listeners
            $(this.selectRef.el).off('change');
            $(this.selectRef.el).select2('destroy');
        }
    }

    /**
     * Handles user selection from dropdown
     * 
     * Updated for Select2:
     * - Works with both native select and Select2 events
     * - Parses string value back to integer for proper comparison
     * - Uses find() to get the full user object (not just ID)
     * - Stores full object to avoid additional lookups in template
     * - Event-driven approach for real-time UI updates
     */
    onUserSelect(event) {
        const userId = parseInt(event.target.value);
        // Find the complete user object by ID to store all user data
        this.state.selectedUser = this.state.users.find(user => user.id === userId);
    }
}

registry.category("actions").add("ftco_widgets_demo.hello_widget_action", HelloWidget);
