namespace Domain
{
    public class Activity
    {

        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public bool IsCancelled { get; set; }

        public ICollection<ActivityAttendee> Attendees { get; set; } = [];

        public void EditActivity(Activity activity)
        {
            Title = activity.Title;
            Date = activity.Date;
            Description = activity.Description;
            Category = activity.Category;
            City = activity.City;
            Venue = activity.Venue;
            // IsCancelled = activity.IsCancelled;
        }
    }
}