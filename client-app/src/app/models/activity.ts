export interface Activity {
    id: string | undefined
    title: string
    date: string
    description: string
    category: string
    city: string
    venue: string
  }

export interface ActivityFormType {
    title: string
    date: string
    description: string 
    category: string
    city: string
    venue: string
  
}


export const mapFormToActivity = (form: ActivityFormType, id: string | undefined): Activity => {
    return {
      id,
      title : form.title,
      date : form.date,
      description:form.description,
      category : form.category,
      city : form.city,
      venue : form.venue
    }
}