function thumbs_rating_vote(ID, type)
{
	// For the LocalStorage 
	
	var itemName = "thumbsrating" + ID;
	
	// Check if the LocalStorage value exist. If do nothing.
	
	if (!localStorage.getItem(itemName)){
		
		// Prevent accidental (or intentional) multi-clicks
		jQuery('.thumbs-rating-up,.thumbs-rating-down').removeAttr('onclick');
	
		// Data for the Ajax Request
		
		var data = {
			action: 'thumbs_rating_add_vote',
			postid: ID,
			type: type
		};
			
		jQuery.post(thumbs_rating_ajax.ajax_url, data, function(response) {
	
			var container = '#thumbs-rating-' + ID;
			
			var object = jQuery(container);
			
			jQuery(container).html('');
			
			jQuery(container).append(response);
			
			// Remove the class and ID so we don't have 2 DIVs with the same ID
			
			jQuery(object).removeClass('thumbs-rating-container');
			jQuery(object).attr('id', '');
			
			// Add the class to the clicked element
			
			var new_container = '#thumbs-rating-' + ID;
			
			// Check the type
			
			if( type == 1){ thumbs_rating_class = ".thumbs-rating-up"; }
			else{ thumbs_rating_class = ".thumbs-rating-down";  }
			
			jQuery(new_container +  thumbs_rating_class ).addClass('thumbs-rating-voted');
			
			// Set HTML5 LocalStorage so the user can not vote again unless he clears it.
			
			var itemName = "thumbsrating" + ID;
			
			localStorage.setItem(itemName, true);
			
			// Set the localStorage type as well
			
			var typeItemName = "thumbsrating" + ID + "-" + type;
			localStorage.setItem(typeItemName, true);
	
		});
	}else{

		// Display message if we detect LocalStorage
		
		jQuery('#thumbs-rating-' + ID + ' .thumbs-rating-already-voted').fadeIn().css('display', 'block');
	}
}
