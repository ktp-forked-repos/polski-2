import Question from "./Question";

class Lesson {
  public id: number
  public completed: boolean
  public skillId: number
  public questions: Question[]
  public words: string
  public createdAt: Date
  public updatedAt: Date
  
  public constructor() {
    this.id = 0
    this.completed = false
    this.skillId = 0
    this.questions = []
    this.words = ''
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export default Lesson