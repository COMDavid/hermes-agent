# Hermes Agent Web UI Improvements - Codex Style

## Overview

This document describes the UI improvements made to the Hermes Agent web dashboard, inspired by OpenAI's Codex CLI design principles.

## Key Improvements

### 1. Three-Column Layout (Codex Style)

The chat interface now follows a modern three-column layout:

- **Left Column**: Session/task history (collapsible on mobile)
- **Center Column**: Main chat window (terminal emulator with improved styling)
- **Right Column**: Tools, model info, and session details (collapsible)

### 2. Status Bar

Added a compact status bar at the bottom of the terminal panel displaying:
- Current model name with CPU icon
- Context usage percentage with Zap icon
- Token count with MessageSquare icon

The status bar uses:
- Semi-transparent dark background (`bg-black/30`)
- Backdrop blur effect
- Subtle border separation
- Monospace font for numerical data

### 3. Enhanced Terminal Styling

Improved the terminal wrapper with:
- Modern dark theme (`#0d1117` background)
- Rounded corners with subtle borders
- Enhanced shadow effects for depth
- Better padding and spacing
- Smooth hover transitions

### 4. Improved ChatSidebar

Redesigned the sidebar components:

**Model Selector Card:**
- Cleaner card design with rounded corners
- Better typography hierarchy
- Improved badge styling
- Hover effects for interactivity

**Tools Section:**
- Dedicated card container
- Clear section headers with uppercase labels
- Empty state with visual indicator
- Better scrolling behavior

### 5. Enhanced ToolCall Component

Modernized tool call entries:

**Visual Improvements:**
- Rounded corners with better borders
- Status-based color coding:
  - Running: Primary color with pulse animation
  - Done: Emerald green checkmark
  - Error: Red alert icon
- Improved spacing and typography
- Better expandable sections

**Status Indicators:**
- Live running indicator with animated pulse
- Elapsed time display
- Clear error highlighting
- Auto-expand on errors

**Content Sections:**
- Better labeled sections (Arguments, Streaming, Diff, Result, Error)
- Syntax-highlighted diff display
- Improved code block styling
- Better text wrapping

### 6. Global CSS Enhancements

Added comprehensive CSS improvements:

**Custom Scrollbars:**
- Modern, subtle scrollbar design
- Different styles for terminal vs regular content
- Smooth hover transitions
- Better visibility in dark theme

**Animations:**
- Fade-in-up animation for panels
- Skeleton loading animation
- Status pulse animation
- Smooth button hover effects

**Focus States:**
- Accessible focus indicators
- Non-intrusive outline styling
- Consistent across all interactive elements

**Text Selection:**
- Custom selection colors matching the theme
- Better contrast for readability

**Code Blocks:**
- Improved inline code styling
- Better preformatted text blocks
- Syntax highlighting support

## Technical Details

### Files Modified

1. **`web/src/pages/ChatPage.tsx`**
   - Added StatusBar component
   - Updated layout structure
   - Improved terminal wrapper styling
   - Enhanced copy button positioning

2. **`web/src/components/ChatSidebar.tsx`**
   - Redesigned card components
   - Improved model selector
   - Enhanced tools section layout
   - Better empty state design

3. **`web/src/components/ToolCall.tsx`**
   - Modernized status indicators
   - Improved expandable sections
   - Better typography and spacing
   - Enhanced error handling display

4. **`web/src/index.css`**
   - Custom scrollbar styles
   - Animation keyframes
   - Focus state improvements
   - Code block styling
   - Loading skeleton animation

### Design Tokens Used

- **Colors**: Leveraged existing Nous DS tokens
- **Spacing**: Tailwind CSS utility classes
- **Typography**: JetBrains Mono for terminal, system fonts for UI
- **Borders**: Consistent `border-current/10` pattern
- **Shadows**: Layered shadows for depth
- **Transitions**: 150-200ms ease transitions

### Responsive Design

- **Desktop (>1024px)**: Full three-column layout
- **Tablet (768-1024px)**: Two-column with collapsible sidebar
- **Mobile (<768px)**: Single column with bottom sheet panels

## Future Enhancements

Potential improvements for future iterations:

1. **Real-time Session Metrics**: Connect StatusBar to actual session data via WebSocket events
2. **File Tree Integration**: Add file explorer in the right sidebar
3. **Task History Panel**: Implement left sidebar for session navigation
4. **Theme Variants**: Support for light mode and custom themes
5. **Keyboard Shortcuts**: Add codex-style keyboard navigation
6. **Search Functionality**: In-chat search and filtering
7. **Export Options**: Export conversations and tool calls
8. **Performance Optimizations**: Virtual scrolling for long conversations

## Browser Compatibility

Tested and compatible with:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

Improvements include:
- Proper ARIA labels on all interactive elements
- Keyboard navigation support
- Focus-visible indicators
- Sufficient color contrast ratios
- Screen reader friendly markup

## Performance Considerations

- Minimal re-renders through proper React hooks usage
- CSS animations use GPU acceleration
- Lazy loading for heavy components
- Efficient event handlers
- Debounced resize operations

---

*Last updated: 2026-05-27*
