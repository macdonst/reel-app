export default function styleText({id, height, itemwidth, nobar, space, tagName = ''}) {
  console.log('styleText called')
  return `${tagName} div[id="${id}"] {
          height: ${height};
        }

        ${tagName} div[id="${id}"] > * {
          flex: 0 0 ${itemwidth};
        }

        ${tagName} div[id="${id}"] > img {
          height: 100%;
          flex-basis: auto;
          width: auto;
        }

        ${tagName} div[id="${id}"] > * {
          margin-inline-start: ${space};
        }

        ${tagName} div[id="${id}"].overflowing {
          ${!nobar ?
    `padding-bottom: ${space};`
    : ''}
        }

        ${nobar ? `
        ${tagName} div[id="${id}"] {
          scrollbar-width: none;
        }

        ${tagName} div[id="${id}"]::-webkit-scrollbar {
          display: none;
        }
        ` : ''}
      `.trim();
}
