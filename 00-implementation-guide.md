# ESP32 Reference Website - Implementation Guide

This guide outlines the recommended order for implementing the ESP32 reference website using Claude Code.

## Prerequisites

- Node.js and npm installed
- Git repository initialized
- Basic understanding of React and Tailwind CSS

## Step-by-Step Implementation

### Phase 1: Project Foundation
**Estimated Time: 30-60 minutes**

1. **Initial Setup**
   - Use prompt from `01-project-setup.md`
   - Create React + Vite project structure
   - Install Tailwind CSS
   - Set up routing (React Router)

2. **Design System Implementation**
   - Use specifications from `02-design-system.md`
   - Create CSS variables in global stylesheet
   - Set up typography (import Google Fonts)
   - Create base component styles
   - Test color palette and verify contrast ratios

3. **Basic Navigation & Layout**
   - Sticky header with logo and nav links
   - Footer with credits/links
   - Responsive breakpoints
   - Dark theme implementation

### Phase 2: Home Page & Variant Cards
**Estimated Time: 1-2 hours**

1. **Variant Data Structure**
   - Create `src/data/variants.js`
   - Add basic info for all variants (ESP32, S2, S3, C3, C6, H2)
   - Include: name, release year, key specs, use cases

2. **Variant Cards Component**
   - Grid layout on home page
   - Card design with futuristic styling
   - Hover effects (glow, scale)
   - Link to detail pages

3. **Home Page Content**
   - Hero section with site description
   - "Quick Start" section
   - Featured variants
   - Call-to-action buttons

### Phase 3: Comparison Table
**Estimated Time: 2-3 hours**

1. **Comparison Data**
   - Use structure from `04-comparison-table.md`
   - Create comprehensive spec data for all variants
   - Add all categories: CPU, memory, peripherals, wireless, etc.

2. **Table Component**
   - Desktop: Full table with horizontal scroll
   - Tablet: Accordion or simplified view
   - Mobile: Card-based view
   - Implement sorting functionality
   - Add filtering dropdowns

3. **Special Features**
   - "Best For" recommendations section
   - Row highlighting on hover
   - Side-by-side comparison mode
   - Export to CSV/JSON (optional)

### Phase 4: Interactive Pinout Diagrams
**Estimated Time: 4-6 hours**

This is the most complex feature - break it into sub-tasks:

1. **Pinout Data Structure**
   - Use structure from `03-pinout-diagrams.md`
   - Start with ESP32-WROOM-32 (38 pins)
   - Create complete pin database with all functions
   - Add notes and warnings

2. **SVG Chip Diagram**
   - Create SVG representation of chip/dev board
   - Label all pins clearly
   - Make pins clickable/hoverable areas

3. **Interactivity**
   - Hover tooltips
   - Click to select and show details
   - Category filtering buttons
   - Color-coding by pin type

4. **Detail Panel**
   - Pin information display
   - Alternate functions list
   - Usage notes and warnings
   - Example connections

5. **Additional Variants**
   - Add ESP32-S3, C3, S2 diagrams
   - Reuse components where possible
   - Create variant selector

### Phase 5: Common Circuits Library
**Estimated Time: 3-4 hours**

1. **Circuit Data**
   - Use format from `05-common-circuits.md`
   - Start with 5-10 essential circuits:
     - Power supply (3.3V regulator)
     - USB-to-serial programming
     - Basic button input
     - LED output
     - I2C connection

2. **Circuit Display Components**
   - Circuit card layout
   - Schematic rendering (SVG or images)
   - Parts list
   - Connection instructions
   - Code snippets

3. **Organization**
   - Category tabs/sections
   - Search and filter
   - Difficulty indicators
   - Tags for quick filtering

### Phase 6: Search & Utility Features
**Estimated Time: 1-2 hours**

1. **Global Search**
   - Search across pins, variants, circuits
   - Debounced input (300ms)
   - Instant results
   - Keyboard shortcuts (Ctrl+K)

2. **Pin Function Finder**
   - "I need an I2C pin" → shows all I2C-capable pins
   - Filter by variant
   - Show availability

3. **Quick Reference Tools**
   - Voltage level reference (3.3V vs 5V)
   - Current capacity guide
   - Pin limitations cheat sheet

### Phase 7: Polish & Optimization
**Estimated Time: 2-3 hours**

1. **Performance Optimization**
   - Code splitting by route
   - Lazy loading for heavy components
   - Image/SVG optimization
   - Bundle size analysis

2. **Accessibility**
   - Keyboard navigation testing
   - ARIA labels
   - Screen reader testing
   - Focus management

3. **Responsive Testing**
   - Test on mobile devices
   - Verify touch targets (44x44px)
   - Check tablet layouts

4. **Cross-browser Testing**
   - Chrome, Firefox, Safari
   - Mobile browsers

### Phase 8: Content & Documentation
**Estimated Time: Ongoing**

1. **Content Completion**
   - Add remaining variant data
   - Complete all pinout diagrams
   - Expand circuit library

2. **User Documentation**
   - Getting started guide
   - FAQ section
   - Contribution guidelines (if open source)

3. **Meta Information**
   - README.md
   - LICENSE
   - Credits and resources

## Recommended Prompt Sequence for Claude Code

### Session 1: Foundation
```
Read the file 01-project-setup.md and 02-design-system.md, 
then create the initial project structure with React, Vite, 
and Tailwind CSS. Implement the design system (colors, fonts, 
base styles) and create the home page layout with navigation.
```

### Session 2: Home & Data
```
Using the design system we created, build the home page with 
variant cards. Create the variant data structure with specs 
for ESP32, ESP32-S2, ESP32-S3, ESP32-C3, ESP32-C6. Each card 
should have futuristic styling with hover effects.
```

### Session 3: Comparison
```
Read 04-comparison-table.md and create the comparison table 
page. Include sorting, filtering, and responsive layouts 
(desktop table, mobile cards). Add the "Best For" 
recommendations section.
```

### Session 4: Pinouts Part 1
```
Read 03-pinout-diagrams.md and create the pinout viewer for 
ESP32-WROOM-32. Start with the data structure, then create 
an SVG chip diagram with 38 pins. Make pins interactive 
with hover tooltips and click-to-select.
```

### Session 5: Pinouts Part 2
```
Add category filtering (GPIO, I2C, SPI, etc.) to the pinout 
viewer. Implement the detail panel that shows comprehensive 
pin information when clicked. Add color coding for different 
pin types.
```

### Session 6: Circuits
```
Read 05-common-circuits.md and create the common circuits 
library. Start with 5 circuits: power supply, programming, 
button, LED, and I2C. Each should have a schematic, parts 
list, and code example.
```

### Session 7: Search & Polish
```
Add global search functionality across all content. 
Implement the pin function finder. Then optimize performance: 
lazy loading, code splitting, and ensure all animations use 
only transform/opacity. Test responsive design.
```

## Data Sources

You'll need to gather actual ESP32 specifications. Here are official sources:

- **Espressif Official Docs**: https://docs.espressif.com/
- **Datasheets**: https://www.espressif.com/en/support/documents/technical-documents
- **ESP32 Technical Reference**: Detailed register and peripheral info
- **Hardware Design Guidelines**: PCB layout, antenna, power

## Optional Enhancements (Future)

- User accounts for saving favorite pins/circuits
- Community-contributed circuits
- Interactive circuit simulator
- Pin configuration export (code generation)
- Mobile app version
- PDF export of pinouts
- Multi-language support
- Dark/light theme toggle

## Notes for Claude Code

- **No MCPs needed** for basic implementation
- **Web search MCP helpful** for gathering accurate specs
- Provide pin data incrementally (can be tedious to input all at once)
- SVG creation might need iteration for best visuals
- Focus on one variant first, then expand
- Test frequently on mobile during development

## Expected Challenges

1. **SVG Complexity**: Creating accurate chip diagrams
   - Solution: Start simple, iterate, or use simplified geometric shapes

2. **Data Volume**: Lots of pins and specs to input
   - Solution: Start with core variants, expand later

3. **Mobile Interactivity**: Touch targets and tooltips
   - Solution: Larger hit areas, bottom-sheet style modals

4. **Performance**: Many interactive elements
   - Solution: Virtual scrolling, lazy loading, CSS-only animations

## Success Metrics

- [ ] All ESP32 main variants documented (ESP32, S2, S3, C3)
- [ ] Interactive pinout works on mobile and desktop
- [ ] Comparison table is fast and usable
- [ ] At least 10 common circuits documented
- [ ] Site loads in < 2 seconds
- [ ] Lighthouse score > 90
- [ ] Fully responsive on all devices
- [ ] Accessible (WCAG AA)

## License Considerations

- Link to official Espressif documentation (don't copy verbatim)
- Give credit to Espressif
- Your explanations and UI are your IP
- Consider MIT or Apache license for your code
- Community contributions should have clear guidelines

---

Good luck with your ESP32 reference site! This will be an incredibly useful resource for the maker community. 🚀
