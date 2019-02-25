class Word {
  public id: number
  public text: string
  public selected: boolean
  public correct: boolean
  public progress: number
  public category: string
  public expression: Word
  public options: Word[]
  public weight: number
  
  public constructor() {
    this.id = 0
    this.text = ''
    this.selected = false
    this.correct = false
    this.progress = 0
    this.category = ''
    this.expression = new Word
    this.options = []
    this.weight = 0
  }
}

export default Word