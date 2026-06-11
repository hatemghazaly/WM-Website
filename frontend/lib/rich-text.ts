const ALLOWED_TAGS = new Set([
  "strong",
  "b",
  "em",
  "i",
  "u",
  "br",
  "p",
  "div",
  "span",
  "font",
  "h1",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
]);

const BLOCK_TAGS = new Set(["p", "div", "li", "h1", "h2", "h3"]);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeBasicEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function sanitizeStyle(value: string) {
  const allowed: string[] = [];

  for (const declaration of value.split(";")) {
    const [rawProperty, ...rawValueParts] = declaration.split(":");
    const property = rawProperty?.trim().toLowerCase();
    const rawValue = rawValueParts.join(":").trim();

    if (!property || !rawValue) {
      continue;
    }

    if (property !== "color") {
      if (property !== "text-align") {
        continue;
      }
    }

    if (property === "color") {
      if (
        !/^#[0-9a-f]{3,8}$/i.test(rawValue) &&
        !/^[a-z][a-z\s-]*$/i.test(rawValue) &&
        !/^rgba?\([^)]+\)$/i.test(rawValue) &&
        !/^hsla?\([^)]+\)$/i.test(rawValue)
      ) {
        continue;
      }
    } else if (!/^(left|right|center|justify)$/i.test(rawValue)) {
      continue;
    }

    allowed.push(`${property}: ${rawValue}`);
  }

  return allowed.join("; ");
}

function sanitizeAttributes(tagName: string, rawAttributes: string) {
  if (!BLOCK_TAGS.has(tagName) && tagName !== "span" && tagName !== "font") {
    return "";
  }

  const styleMatch = rawAttributes.match(
    /\bstyle\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i,
  );
  const styleValue = styleMatch?.[1] ?? styleMatch?.[2] ?? styleMatch?.[3] ?? "";
  const safeStyle = sanitizeStyle(styleValue);

  const colorMatch = rawAttributes.match(
    /\bcolor\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i,
  );
  const colorValue = colorMatch?.[1] ?? colorMatch?.[2] ?? colorMatch?.[3] ?? "";
  const safeColor =
    colorValue &&
    ((/^#[0-9a-f]{3,8}$/i.test(colorValue) ||
      /^[a-z][a-z\s-]*$/i.test(colorValue) ||
      /^rgba?\([^)]+\)$/i.test(colorValue) ||
      /^hsla?\([^)]+\)$/i.test(colorValue))
      ? colorValue
      : "");

  const styles: string[] = [];
  if (safeStyle) {
    styles.push(safeStyle);
  } else if (safeColor) {
    styles.push(`color: ${safeColor}`);
  }
  const alignMatch = rawAttributes.match(
    /\balign\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i,
  );
  const alignValue = alignMatch?.[1] ?? alignMatch?.[2] ?? alignMatch?.[3] ?? "";
  const safeAlign = /^(left|right|center|justify)$/i.test(alignValue)
    ? alignValue.toLowerCase()
    : "";

  if (safeAlign) {
    styles.push(`text-align: ${safeAlign}`);
  }

  return styles.length ? ` style="${escapeHtml(styles.join("; "))}"` : "";
}

function sanitizeTag(token: string) {
  const match = token.match(
    /^<\s*(\/)?\s*([a-zA-Z0-9]+)([^>]*)\s*(\/?)>$/,
  );

  if (!match) {
    return escapeHtml(token);
  }

  const [, closingSlash, rawTagName, rawAttributes, selfClosingSlash] = match;
  const tagName = rawTagName.toLowerCase();

  if (!ALLOWED_TAGS.has(tagName)) {
    return "";
  }

  if (tagName === "font") {
    if (closingSlash) {
      return "</span>";
    }

    const attributes = sanitizeAttributes(tagName, rawAttributes);
    return `<span${attributes}>`;
  }

  if (tagName === "br") {
    return "<br />";
  }

  if (closingSlash) {
    return `</${tagName}>`;
  }

  const attributes = sanitizeAttributes(tagName, rawAttributes);
  const selfClosing = selfClosingSlash || tagName === "br" ? " /" : "";

  return `<${tagName}${attributes}${selfClosing}>`;
}

export function sanitizeRichTextHtml(value: string) {
  if (!value) {
    return "";
  }

  return value
    .split(/(<[^>]+>)/g)
    .map((token) => {
      if (token.startsWith("<")) {
        return sanitizeTag(token);
      }

      return escapeHtml(decodeBasicEntities(token)).replace(/\r?\n/g, "<br />");
    })
    .join("");
}
