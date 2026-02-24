export default {
  name: 'maker',
  title: 'De Maker (Over Mij)',
  type: 'document',
  fields: [
    { 
      name: 'titel', 
      title: 'Titel van het blok', 
      type: 'string',
      description: 'Bijv: Passie, Precisie & Erfgoed'
    },
    { 
      name: 'verhaal1', 
      title: 'Paragraaf 1', 
      type: 'text',
      description: 'Het eerste deel van je verhaal (bijv. over je Marokkaanse roots)'
    },
    { 
      name: 'verhaal2', 
      title: 'Paragraaf 2', 
      type: 'text',
      description: 'Het tweede deel van je verhaal (bijv. over je visie in Rotterdam)'
    },
    { 
      name: 'foto', 
      title: 'Portretfoto', 
      type: 'image', 
      options: { hotspot: true } 
    }
  ]
}
