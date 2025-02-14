

## **1. Item Dimension Mapping Table**
This table defines how each item manages its **width and height** and whether it relies on an alternative property.

| **Item Type**   | **Uses width/height directly?** | **Alternative Property** |
|---------------|------------------------|----------------------|
| **Rectangle** | ✅ Yes                     | ❌ No alternative  |
| **TextItem** | ⚠️ Computed from `fontSize` | `width` auto-computed |
| **Circle** | ❌ No                     | `radius` determines both `width` & `height` |
| **Ellipse** | ❌ No                     | `radiusX`, `radiusY` control size |
| **Line** | ⚠️ Derived from length & angle | Uses `startX, startY, endX, endY` |




👉 **This is the most important table in the library. It will be updated regularly as we add more items. Completing this table for every item ensures the system remains predictable and extendable.**
