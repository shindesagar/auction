import React from 'react'

export default function ProductForm() {
  return (
    <main className="form-signin ">
        <div className='container'>
            <div className="form-floating mb-3 text-center fw-bold fs-1">Add Product</div>
            <div class="mb-3">
                <label  class="form-label">Title</label>
                <input type="text" class="form-control"/>
            </div>
            <div class="mb-3">
                <label  class="form-label">Slug</label>
            </div>
            <div  class="mb-3">
                <label  class="form-label">Category</label>
                <select class="form-select" aria-label="Category">
                    <option selected></option>
                    <option value="car">Car</option>
                    <option value="House">House</option>
                    <option value="jwelry">Jwelry</option>
                    <option value="watches">Watches</option>
                </select>
            </div>
            <div class="mb-3">
                <label  class="form-label">Description</label>
                <textarea class="form-control" rows="3"></textarea>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <div class="mb-3">
                        <label  class="form-label">Starting Bid</label>
                        <input type="number" class="form-control"/>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div class="mb-3">
                        <label  class="form-label">Auction Duration</label>
                        <input type="number" class="form-control"/>
                    </div>
                </div>
            </div>
            <div class="mb-3">
            <label for="formFileSm" class="form-label">Images</label>
            <input class="form-control" id="formFileMd" type="file"/>
            </div>
        </div>   
    </main>
  )
}
