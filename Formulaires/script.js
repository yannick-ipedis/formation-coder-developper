$(document).ready(function() {

    //----Validate Form on submit---------------------------------------------------------------------------------------------------------
    $("#signup-form").on("submit", function() {
      var validate = 0;
      $(".numeric").each(function() {
        validateNumber("#" + $(this).attr("id"));
      });

      // Validate all required fields
      $(".required-field").each(function() {
        var fieldValue = $(this).val();
        if (fieldValue == "") {
          validate++;
          //Error handling for screen readers
          $(this).parent().find(".error-message").show(); //Show error message
          addAria($(this));
        } else {
          $(this).parent().find(".error-message").hide(); //Hide error mesage
          removeAria($(this));
        }
      });

      //----Validate Phone Number and Postal Code-----------------------------------------------------------------------------------------------------
      function validateNumber(element) {
        let value = $(element).val();
        var limit = element == "#p_num" ? 8 : 5; // Assign correct limit of length depending on field
        var reg = /^\d+$/; //Number regex
        if (!reg.test(value)) { // Check if value of field contains only numbers
          $(element).parent().find(".error-message").show(); //display error message
          addAria(element);
          validate++;
        } else if (value.length < limit) {
          $(element).parent().find(".error-message").show(); //display error message
          addAria(element);
          validate++;
        } else {
          $(element).parent().find(".error-message").hide(); //hide error message
          removeAria(element)
        }
      }

      // Validate all required fields
      $(".checkbox").each(function() {
        if (!$(this).is(":checked")) {
          validate++;
          //Error handling for screen readers
          $(this).parent().find(".error-message").show(); //Show error message
          addAria($(this));
        } else {
          $(this).parent().find(".error-message").hide(); //Hide error mesage
          removeAria($(this));
        }
      });

      if (validate != 0) {
        $("input[aria-invalid]:eq(0)").focus(); //Set focus on first invalid field
        return false;
      }
      return false;
    });

    // Adding Accessibility attributes if field is invalid
    function addAria(element) {
      $(element).attr("aria-invalid", true); //Adding invalid statement for screen readers
      //Associate error message to field
      var errorid = $(element).parent().find(".error-message").attr("id");
      $(element).attr("aria-describedby", errorid);
    }

    // Removing Accessibility Attributes if field is valid
    function removeAria(element) {
      $(element).removeAttr("aria-invalid"); //Remove invalid statement
      $(element).attr("aria-describedby", ""); //Remove asxsociation error message to field
    }

  });