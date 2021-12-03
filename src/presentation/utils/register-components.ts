import type { App } from 'vue'

const requireComponent = require.context(
  // The relative path of the components folder
  '@/presentation/components',
  // Whether or not to look in sub folders
  true,
  // The regular expression used to match base component filenames
  /ad-[a-z]\w+\.(vue|js)$/
)

export function registerComponents(app: App): void {
  for (const fileName of requireComponent.keys()) {
    const componentConfig = requireComponent(fileName)

    const componentName =
      fileName
        ?.split('/')
        ?.pop()
        ?.replace(/\.\w+$/, '') || ''

    // Register component globally
    componentName &&
      app.component(componentName, componentConfig.default || componentConfig)
  }
}
