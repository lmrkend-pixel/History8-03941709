# Navigation Layout Update Plan

## Context
The user wants to update the header layout to match the reference design where:
1. The title should read "Social Studies Explorers Hub" instead of "SOCIAL STUDIES HUB"
2. The navigation menu (Home, Videos, Games, Quizzes, Trivia Corner, About Us) should be positioned on the right side of the header, on the same horizontal line as the logo/title

Currently, the navigation is positioned below the logo/title in a separate row with a top border.

## Current Structure (Index.tsx lines 36-84)
```tsx
<header>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      {/* Logo icons */}
      <div>{/* Title */}</div>
    </div>
  </div>
  <nav className="mt-4 flex flex-wrap gap-2 border-t-2...">
    {/* Navigation buttons */}
  </nav>
</header>
```

## Proposed Changes

### File to Modify
- `/workspace/thread/src/pages/Index.tsx` (lines 36-84)

### Implementation Details

1. **Update Title Text** (line 51-53)
   - Change from: `SOCIAL STUDIES <span>HUB</span>`
   - Change to: `SOCIAL STUDIES EXPLORERS <span>HUB</span>`

2. **Restructure Header Layout** (lines 38-83)
   - Move navigation from separate row into the same flex container as the logo
   - Remove the outer `justify-between` wrapper div
   - Create single row layout: `Logo | Title | Navigation (right-aligned)`
   - Remove `mt-4`, `border-t-2`, `pt-3` from nav since it's no longer below the title

3. **New Layout Structure**
   ```tsx
   <div className="flex items-center justify-between">
     {/* Left side - Logo and Title */}
     <div className="flex items-center gap-3">
       {/* Existing logo icons */}
       <div>
         <h1>SOCIAL STUDIES EXPLORERS <span>HUB</span></h1>
       </div>
     </div>
     
     {/* Right side - Navigation */}
     <nav className="flex gap-2">
       {/* Navigation buttons */}
     </nav>
   </div>
   ```

4. **Responsive Considerations**
   - Keep existing responsive text sizes for title (`text-2xl md:text-4xl`)
   - Keep responsive button sizes (`text-base md:text-lg`)
   - May need to add responsive behavior for mobile (hide nav, show menu button)
   - Consider adding overflow handling for smaller screens

5. **Styling Adjustments**
   - Remove top border from navigation
   - Adjust button spacing/padding if needed for horizontal alignment
   - Ensure proper alignment with flexbox utilities
   - Keep existing active state styling (brown background)

## Verification Steps

1. **Visual Check**
   - Logo and title on the left
   - Navigation buttons horizontally aligned on the right
   - All on the same line in desktop view
   - Title reads "Social Studies Explorers Hub"

2. **Responsive Check**
   - Test on mobile viewport (320px-768px)
   - Test on tablet viewport (768px-1024px)
   - Test on desktop viewport (1024px+)
   - Ensure no overflow or layout breaking

3. **Functionality Check**
   - Navigation buttons still work correctly
   - Active state highlighting functions properly
   - Clicking each button navigates to correct section

4. **Styling Check**
   - Consistent spacing and padding
   - Proper color scheme maintained
   - Border and shadow effects intact
   - Hover states working correctly

## Potential Issues & Solutions

**Issue**: Text might be too long on mobile devices
**Solution**: Add responsive breakpoint to stack navigation below title on small screens, or implement hamburger menu

**Issue**: Navigation might wrap to next line on tablet sizes
**Solution**: Adjust button text sizes or implement scrollable horizontal navigation

**Issue**: Title might be too long with "Explorers" added
**Solution**: May need to adjust font size responsively or break into two lines on smaller screens
