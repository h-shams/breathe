// this file will used in "webpack-pwa-manifest" plugin as options to create
// a manifest.json file for app

module.exports = {
  name: 'Breathe App',
  short_name: "Breathe",
  description: 'Breathe App help you calm down by controling your breathe!',
  orientation: "portrait",
  display: 'fullscreen',
  start_url: ".",
  theme_color: '#000000',
  background_color: '#ffffff',
  icons: [
    {
      src: './src/icons/icon_maskable512.png',
      size: [72, 96, 144, 192, 512],
      purpose: 'any maskable',
      destination: 'icons'
    }
  ],

  // options for 'webpack-pwa-manifest' plugin and not included in output
  // manifest.json
  inject: true,
  fingerprints: false,
}
