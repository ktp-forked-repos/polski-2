import Option from './Option'

class Question {
  public id: number
  public category: string
  public expression: string
  public audio: string
  public weight: number
  public lessonId: number
  public correct: boolean | undefined
  public options: Option[]
  public createdAt: Date
  public updatedAt: Date
  
  public constructor() {
    this.id = 0
    this.category = ''
    this.expression = ''
    this.audio = ''
    this.weight = 0
    this.lessonId = 0
    this.correct = false
    this.options = []
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export default Question