const CheckoutForm = () => {
  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className="text-gray-600">
              First Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-gray-600">
              Last Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              className="input-box"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="text-gray-600">
            Phone number
          </label>
          <input type="text" name="phone" id="phone" className="input-box" />
        </div>

        <div>
          <label htmlFor="email" className="text-gray-600">
            Email address
          </label>
          <input type="email" name="email" id="email" className="input-box" />
        </div>

        <div>
          <label htmlFor="region" className="text-gray-600">
            Country/Region
          </label>
          <input type="text" name="region" id="region" className="input-box" />
        </div>

        <div>
          <label htmlFor="address" className="text-gray-600">
            Street address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="input-box"
          />
        </div>

        <div>
          <label htmlFor="city" className="text-gray-600">
            City
          </label>
          <input type="text" name="city" id="city" className="input-box" />
        </div>

        <div>
          <label htmlFor="state" className="text-gray-600">
            State
          </label>
          <input type="text" name="state" id="state" className="input-box" />
        </div>

        <div>
          <label className="text-gray-600">Delivery Location</label>
          <div className="flex items-center space-x-4">
            <label htmlFor="delivery-home" className="flex items-center">
              <input
                type="radio"
                id="delivery-home"
                name="delivery"
                value="home"
                className="mr-2 my-2"
              />
              Home
            </label>
            <label htmlFor="delivery-office" className="flex items-center">
              <input
                type="radio"
                id="delivery-office"
                name="delivery"
                value="office"
                className="mr-2 my-2"
              />
              Office
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
