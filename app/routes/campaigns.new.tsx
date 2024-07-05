export default function NewCampaignRoute() {
    return (
      <>
        <h2>Create a new Campaign</h2>
        <div className="container">
        <form method="post">
          <div className="block">
            <label>
              Name: <input type="text" name="name" />
            </label>
          </div>
          <div className="block">
            <label>
              Content: <textarea name="content" />
            </label>
          </div>
          <div className="block">
            <button type="submit" className="button">
              Add
            </button>
          </div>
        </form>
      </div>
      </>);
  }
  