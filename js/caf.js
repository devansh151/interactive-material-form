$(document).ready(function() {

    var data;
    var url=window.location.href;
    var param;
    if(url.substr(url.indexOf("#")+1)=="yes")
    {
      $(".switch-btn.yes").addClass("active");
      param=true;
    }
    else if(url.substr(url.indexOf("#")+1)=="no")
    {
      $(".switch-btn.no").addClass("active");
      param=false;
    }
    $(document).on("keyup focus","#personalDetailsForm input",function(){ 
      if($("#personalDetailsForm").validate().checkForm())
      {
        $("#personalDetailsForm .continue").removeClass("disabled");
        $(this).parents(".collapse").siblings().css("border-left","5px solid #558b2f");
      }
      else
      {
        $("#personalDetailsForm .continue").addClass("disabled");
        $(this).parents(".collapse").siblings().css("border-left","5px solid #eb4141");
      }
    });

    $.ajax({
      url:"cafJson.json",
      dataType:"json", 
      success:function(response){
      data=JSON.parse(JSON.stringify(response));
       if (!$.isEmptyObject(data) && param)
        {
          init();
          fillDetails();
        }
        else
        {
          init();
          addIndivisualOptions();
          addBankAcDetails();
        }
      },

    });

    $("#phoneNumber,#nomineePhoneNumber,#guardianPhoneNumber").intlTelInput({nationalMode: false,autoPlaceholder: false,utilsScript: "js/utils.js"});
    var unitIds=2;
     
     $.validator.addMethod("pan", function(value, element)
    {
        return this.optional(element) || /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value);
    }, "Invalid Pan Number");

     $.validator.addMethod("validatePhone", function(value, element)
    {
      if ($(element).intlTelInput("isValidNumber")) 
      {
          return true;
      } 
      else 
      {
          return false;
      }
    }, "Please enter a valid mobile number");

     $("#personalDetailsForm").validate({
        rules: {
            "panNumber": {
              pan: true,
              required:true
                        },
            "phoneNumber": {
              validatePhone: true,
              required:true
                          },
            "clientName":"required",
            "emailId":"required",
            "dob":"required",
            "gender":"required",
            "nri-q":"required",
            "doInc":"required",
            "address":"required",
            "city":"required",
            "country":"required",
            "state":"required",
            "pinCode":"required",
        },
        errorPlacement: function(error, element) {
                    if(element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } 
                      else if (element.attr("type") == "tel") {
                            error.insertAfter($(element).parents('div.intl-tel-input'));
                            //$("div.contactformfooter").find(".help-block").css({"margin-top":"-15px","margin-bottom":"0"});
                        }
                      else
                        {
                        
                        error.insertAfter(element);
                        }
            }
    });


    $("#personalDetailsForm input").keyup(function(){
      if($("#personalDetailsForm").validate().checkForm())
      {
        $("#personalDetailsForm .continue").removeClass("disabled");
      }
      else
      {
        $("#personalDetailsForm .continue").addClass("disabled");
      }
    });

    $("#personalDetailsForm .continue").click(function(){
      if(!$(this).hasClass("disabled"))
      {
        $("#personalDetailsContent").collapse('hide');
        $("#purchaseDetailsContent").collapse('show');
      }
      //alert("dsas");
    });
    $("#bankDetailsForm").validate({
       rules:{
        "bankAcNo":"required",
        "acHolder":"required",
        "bankName":"required",
        "branchName":"required",
        "ifscCode":"required",
        "confirmBankAcNo": {
            required:true,
            equalTo: "#bankAcNo"
          }
       },
    });
    $("#bankDetailsForm .bankAcDetails input").rules("add",{
       required: true,
    });
     $(document).on("keyup focus","#bankDetailsForm input",function(){
      if($("#bankDetailsForm").validate().checkForm())
      {
        $("#bankDetailsForm .continue").removeClass("disabled");
        $(this).parents(".collapse").siblings().css("border-left","5px solid #558b2f");
      }
      else
      {
        $("#bankDetailsForm .continue").addClass("disabled");
        $(this).parents(".collapse").siblings().css("border-left","5px solid #eb4141");
      }
    });

   
    $("#bankDetailsForm .continue").click(function(){
      if(!$(this).hasClass("disabled"))
      {
        $("#bankDetailsContent").collapse('hide');
        $("#nomineeDetailsContent").collapse('show');
      }
      //alert("dsas");
    });

     $("#nomineeDetailsForm").validate({
        rules: {
            "nomineeName":"required",
            "nomineePhoneNumber":{
              validatePhone: true,
              required:true
                          },
            "nomineeEmailId":"required",
            "nomineeDob":"required",
            "nomineeGender":"required",
            "nomineeAddress":"required",
            "nomineeCity":"required",
            "nomineeCountry":"required",
            "nomineeState":"required",
            "nomineePinCode":"required",
            "guardianName":"required",
            "guardianPhoneNumber":{
              validatePhone: true,
              required:true
                          },
            "guardianEmailId":"required",
            "guardianRelationship":"required",
            "guardianAddress":"required",
            "guardianCity":"required",
            "guardianCountry":"required",
            "guardianState":"required",
            "guardianPinCode":"required",
        },
        errorPlacement: function(error, element) {
                    if(element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } 
                      else if (element.attr("type") == "tel") {
                            error.insertAfter($(element).parents('div.intl-tel-input'));
                            //$("div.contactformfooter").find(".help-block").css({"margin-top":"-15px","margin-bottom":"0"});
                        }
                      else
                        {
                        
                        error.insertAfter(element);
                        }
            }
        });
     $(document).on("keyup focus","#nomineeDetailsForm input",function(){
      if($("#guardianDetailsForm").length)
      {
        if($("#nomineeDetailsForm").validate().checkForm() && $("#guardianDetailsForm").validate().checkForm())
        {
          $("#nomineeDetailsForm .continue").removeClass("disabled");
          $(this).parents(".collapse").siblings().css("border-left","5px solid #558b2f");
        }
        else
        {
          $("#nomineeDetailsForm .continue").addClass("disabled");
          $(this).parents(".collapse").siblings().css("border-left","5px solid #eb4141");
        }
      }
      else
      {
         if($("#nomineeDetailsForm").validate().checkForm())
        {
          $("#nomineeDetailsForm .continue").removeClass("disabled");
          $(this).parents(".collapse").siblings().css("border-left","5px solid #558b2f");
        }
        else
        {
          $("#nomineeDetailsForm .continue").addClass("disabled");
          $(this).parents(".collapse").siblings().css("border-left","5px solid #eb4141");
        }
      }
      
    });

    $("#nomineeDetailsForm .continue").click(function(){
      if(!$(this).hasClass("disabled"))
      {
        $("#nomineeDetailsContent").collapse('hide');
        $("#documentDetailsContent").collapse('show');
      }
      //alert("dsas");
    });
    $("#documentDetailsForm .continue").click(function(){
      if(!$(this).hasClass("disabled"))
      {
        $("#nomineeDetailsContent").collapse('hide');
        $("#documentDetailsContent").collapse('show');
      }
      //alert("dsas");
    });

    $("#purchaseDetailsForm").validate({
        rules: {
            "nou1":{
              min: 1,
              required:true
                          },
            
        },
        messages:{
          "nou1":{
              "min":"cannot be less than 1",
          },
        },
        errorPlacement: function(error, element) {
              if(element.parent('.input-group').length) {
                  error.insertAfter(element.parent());
              } 
                else if (element.attr("type") == "tel") {
                      error.insertAfter($(element).parents('div.intl-tel-input'));
                      //$("div.contactformfooter").find(".help-block").css({"margin-top":"-15px","margin-bottom":"0"});
                  }
                else
                  {
                  
                  error.insertAfter(element);
                  }
            }
        });

    $(document.body).on('click','#purchaseDetailsContent .ucCardAddBtn',function(){
        addUnit(unitIds);
    });
    $(document.body).on('click','#purchaseDetailsContent .ucCardRemoveBtn',function(){
        removeUnit($(this));
    })
    $(document.body).on('click','#purchaseDetailsContent .coAddBtn',function(){
        addCoOwner($(this));
    });
    $(document.body).on('click','#purchaseDetailsContent .coRemoveBtn',function(){
        removeCoOwner($(this));
    });
   
    $('input[name="property-q1"]').on("click", function (e) {

      var checkbox = $(this);
      if (!checkbox.is(":checked")){
          // do the confirmation thing here
          e.preventDefault();
          return false;
      }
    });
    $('input[name="property-q1"]').on('change', function(e) {
        $('input[name="' + this.name + '"]').not(this).prop('checked', false);
       
        if($("input[name=property-q1]:checked").val()=='resell')
        {
            removeFeatureCard();
            if($("input[name=nri-q]:checked").val()=='No')
            {
              if($('#bankDetailsContent .bankAcDetails').length <= 0)
              {
                addBankAcDetails();
              }
            }
            else if($("input[name=nri-q]:checked").val()=='Yes')
            {
              if($('#bankDetailsContent .nroAcCheckbox').length <= 0)
              {
                addNroAcCheckbox();
              }
            }
            
        }
        else if($("input[name=property-q1]:checked").val()=='possession')
        {
            //addFeatureCard();
            removeBankAcDetails();
            removeNroAcRadios();
            removeNroAcCheckbox();
        }
    });
    $('input[name="payment"]').on('change', function() {
        if($("input[name=payment]:checked").val()=='cheque')
        {
            $("#purchaseDetailsContent .payment-help").removeClass('hidden');
        }
        else if($("input[name=payment]:checked").val()=='online')
        {
            $("#purchaseDetailsContent .payment-help").addClass('hidden');
        }
    });
    $(document.body).on('change','input[name="nri-q"]', function() {
        if($("input[name=nri-q]:checked").val()=='Yes')
        {

          removeNroAcRadios();
          removeBankAcDetails();
          removeNroAcCheckbox();
          addNroAcCheckbox();
          //$.when(removeAllThree()).then(addNroAcCheckbox());
        }
        else if($("input[name=nri-q]:checked").val()=='No')
        {
          removeNroAcCheckbox();
          removeNroAcRadios();
          removeBankAcDetails();
          setTimeout(addBankAcDetails,1000);
          //$.when(removeAllThree()).then(addBankAcDetails());
        }
        $("#bankDetailsForm .continue").addClass('disabled');
    });
     $(document.body).on('click','input[name="nro-q"]', function(e) {

      var checkbox = $(this);
      if (!checkbox.is(":checked")){
          // do the confirmation thing here
          e.preventDefault();
          return false;
      }
    });
    $(document.body).on('change','input[name="nro-q"]', function() {
        $('input[name="' + this.name + '"]').not(this).prop('checked', false);
        if($("input[name=nro-q]:checked").val()=='Yes')
        {
            removeNroAcRadios();
            addBankAcDetails();
            $("#bankDetailsForm .continue").addClass('disabled');
        }
        else if($("input[name=nro-q]:checked").val()=='No')
        {
            removeBankAcDetails();
            addNroAcRadios();
            $("#bankDetailsForm .continue").removeClass('disabled');
        }

    });
    /*$(document.body).on('change','input[name="nomineeGender"]', function() {
        ageValidation($("#nomineeDob").val());
    });*/
    $('#personalDetailsContent').on('shown.bs.collapse', function () {
      // do something…
     $(".progress-bar.bar4").animate({width:"0%"},function(){
        $(".progress-bar.bar3").animate({width:"0%"},function(){
          $(".progress-bar.bar2").animate({width:"0%"},function(){
            $(".progress-bar.bar1").animate({width:"0%"},function(){
        
            });
          });
        });  
      });
    });

     $('#personalDetailsContent').on('shown.bs.collapse', function () {
         $(".progress-bar.bar").animate({width:"0%"},function(){
          $(".milestone .inner-milestone").css("background","#fff");
          $(".mile1").css("background","#558B2F");
         });
    });
    $('#purchaseDetailsContent').on('shown.bs.collapse', function () {
         $(".progress-bar.bar").animate({width:"25%"},function(){
          $(".milestone .inner-milestone").css("background","#fff");
          $(".mile1,.mile2").css("background","#558B2F");
         });
    });
    $('#bankDetailsContent').on('shown.bs.collapse', function () {
        $(".progress-bar.bar").animate({width:"50%"},function(){
          $(".milestone .inner-milestone").css("background","#fff");
          $(".mile1,.mile2,.mile3").css("background","#558B2F");
         });
    });
    $('#nomineeDetailsContent').on('shown.bs.collapse', function () {
      $(".progress-bar.bar").animate({width:"75%"},function(){
          $(".milestone .inner-milestone").css("background","#fff");
          $(".mile1,.mile2,.mile3,.mile4").css("background","#558B2F");
         });
    });
    $('#documentDetailsContent').on('shown.bs.collapse', function () {
      $(".progress-bar.bar").animate({width:"100%"},function(){
         $(".milestone .inner-milestone").css("background","#fff");
          $(".mile1,.mile2,.mile3,.mile4,.mile5").css("background","#558B2F");
         });
    });
    $(document).on("click",'.dropdownjscheckbox ul li input[type=checkbox]',function(e){
      e.preventDefault();
      $(this).parents('li').click();
    });

    /*$(document).on("change",'.dropdownjscheckbox ul li input.pfOther',function(e){
      var value=$(this).parents("ul").siblings(".fakeinput").val();
      $(this).parents("ul").siblings(".fakeinput").val(value+', '+$(this).val());
    });*/
   function init()
   {
        $.material.init();
        $.material.ripples();
        $('[data-toggle="popover"]').popover();
        $("select").dropdown({
            autoinit: "select"
        });
       
        $.uploadPreview({
          input_field: "#document-0",   // Default: .image-upload
          preview_box: "#image-preview",  // Default: .image-preview
          label_field: "#image-label",    // Default: .image-label
          label_default: "Choose File",   // Default: Choose File
          label_selected: "Change File",  // Default: Change File
          no_label: false                 // Default: false
        });
        /*$(".slider#slider1").ionRangeSlider({
            grid: true,
            from: 1,
            hide_min_max: true,
            grid_snap: true,
            values: ['15%','25%','50%','75%','100%']
        });*/
       
         $("#nomineeDob").AnyPicker(
            {
                mode: "datetime",
                showComponentLabel: true,
                dateTimeFormat: "MMM dd, yyyy",
                minValue: new Date(1900, 01, 19),
                onSetOutput: function(sOutput, oSelectedValues)
                    {
                       //ageValidation(sOutput,"nomineeDob");
                       $("#nomineeDetailsForm .continue").addClass("disabled");
                       $("#nomineeDetailsForm #nomineeName").focus();
                    }
            });
        $("#phoneNumber,#nomineePhoneNumber").intlTelInput({nationalMode: false,autoPlaceholder: false,utilsScript: "js/utils.js"});
        $("#phoneNumber,#nomineePhoneNumber").intlTelInput({
            utilsScript:"js/utils.js"
        });
        addNomineeList();
    }   
    function getThisUnitId(addCoOwnerBtn)
    {
        var unitId=$(addCoOwnerBtn).parent().parent().attr("id");
        unitId=unitId.substr(unitId.indexOf("unitCard")+8);
        return unitId;
    }

    function getLatestCId(addCoOwnerBtn)
    {

        var Cid=$(addCoOwnerBtn).siblings().last().attr("id");
        if(Cid===undefined)
        {
            return 0;
        }
        else
        {
            Cid=Cid.substr(Cid.indexOf("_")+1);
            return Cid;
        }
    }

    function addCoOwner(addCoOwnerBtn)
    {
        var uid=getThisUnitId(addCoOwnerBtn);
        var cid=parseInt(getLatestCId(addCoOwnerBtn))+1;
        var coOwnerHtml='<div class="col-md-12 co-ownerCard" id="co-ownerCard'+ uid +'_'+ cid +'">\
                                <div class="col-md-4">\
                                  <div class="form-group">\
                                    <input type="text" class="form-control" name="yourShare'+ uid +'_'+ cid +'" id="yourShare'+ uid +'_'+ cid +'" placeholder="Share value">\
                                  </div>\
                                </div>\
                                <div class="col-md-4">\
                                  <div class="form-group">\
                                    <input type="text" class="form-control" name="co-owner'+ uid +'_'+ cid +'" id="co-owner'+ uid +'_'+ cid +'" placeholder="co-owner name">\
                                  </div>\
                                </div>\
                                <div class="col-md-4">\
                                  <div class="form-group">\
                                    <input type="text" class="form-control" name="co-ownerPan'+ uid +'_'+ cid +'" id="co-ownerPan'+ uid +'_'+ cid +'" placeholder="10 digit PAN">\
                                  </div>\
                                </div>\
                                <i class="material-icons coRemoveBtn" class="coRemoveBtn'+ uid +'_'+ cid +'">clear</i>\
                              </div>';
        /*if($("#purchaseDetailsContent .coOwnerAppend .co-ownerCard").length==0)
        {
          $('.cownerLabels').css("display","block");
        }*/
        $("#purchaseDetailsContent #unitCard"+uid+" .coOwnerAppend").prepend(coOwnerHtml);
    }

    function removeCoOwner(_this)
   {     
        /*if($("#purchaseDetailsContent .coOwnerAppend .co-ownerCard").length == 1)
        {
          $('.cownerLabels').css("display","none");
        }*/
        $(_this).parent('.co-ownerCard').remove();
   }

   function addUnit(uId)
   {
        var unitCardHtml='<div class="col-md-12 unitCard" id="unitCard'+ uId +'">\
                            <a class="ucCardAddBtn" id="ucCardAddBtn'+ uId +'">Add more units...</a>\
                            <a class="ucCardRemoveBtn" id="ucCardRemoveBtn'+ uId +'">Remove</a>\
                            <div class="col-md-2">\
                              <div class="form-group">\
                                <select id="unitSize'+ uId +'" class="form-control">\
                                  <option value="1200">1200</option>\
                                  <option value="1500">1500</option>\
                                  <option value="2400">2400</option>\
                                  <option value="4000">4000</option>\
                                </select>\
                              </div>\
                            </div>\
                            <div class="col-md-2">\
                              <div class="form-group">\
                                <input type="number" minlength="1" class="form-control" id="nou'+ uId +'" placeholder="Units">\
                              </div>\
                            </div>\
                            <div class="col-md-2">\
                              <div class="form-group">\
                                <select id="slider'+ uId +'" name="slider1" class="form-control">\
                                  <option value="15">15%</option>\
                                  <option value="25">25%</option>\
                                  <option value="50">50%</option>\
                                  <option value="75">75%</option>\
                                  <option value="100">100%</option>\
                                </select>\
                              </div>\
                            </div>\
                            <div class="col-md-6 coOwnerAppend">\
                              <!--co-owner cards append here-->\
                              <div class="col-md-12 co-ownerCard" id="co-ownerCard1">\
                                <div class="col-md-4">\
                                  <div class="form-group">\
                                    <input type="number" class="form-control" name="yourShare'+uId+'" id="yourShare'+uId+'" placeholder="Share value" min="0">\
                                  </div>\
                                </div>\
                                <div class="col-md-8">\
                                  <div class="form-group">\
                                    <input type="text" class="form-control" name="co-ownerPan'+uId+'" id="co-ownerPan'+uId+'" placeholder="10 digit PAN separated by comma">\
                                  </div>\
                                </div>\
                                <!--<i class="material-icons coRemoveBtn" class="coRemoveBtn1">clear</i>-->\
                              </div>\
                              <!--<a href="javascript:void(0)" class="coAddBtn btn btn-info" id="coAddBtn1"><i class="material-icons">add_circle_outline</i>&nbsp;Add co-owner</a>-->\
                            </div>\
                            <div class="row">\
                              <div class="col-md-6">\
                                <div class="col-md-6">\
                                  <div class="form-group">\
                                    <div class="checkbox">\
                                      <label>\
                                        <input type="checkbox" name="property-q'+uId+'" value="resell" checked>I want SmartOwner to resell the property for me.\
                                      </label>\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="col-md-6 paddinglr0">\
                                  <div class="form-group">\
                                    <div class="checkbox">\
                                      <label>\
                                        <input type="checkbox" name="property-q'+uId+'" value="possession">I would like to take possession of the property.\
                                      </label>\
                                      <i class="material-icons" style="color:#00acc1;font-size:14px;cursor:pointer;" data-trigger="hover" data-toggle="popover"  title="Popover title" data-content="And here\'s some amazing content. It\'s very engaging. Right?">help</i>\
                                    </div>\
                                  </div>\
                                </div>\
                              </div>\
                              <div class="col-md-6">\
                                <div class="col-md-12">\
                                  <div class="form-group">\
                                    <label for="premiumFeatures'+uId+'" class="col-md-4 control-label">Premium Features</label>\
                                    <div class="col-md-8">\
                                        <select id="premiumFeatures'+uId+'" class="form-control selectcheckbox" multiple="">\
                                          <option value="East">east</option>\
                                          <option value="Corner">Corner</option>\
                                          <option value="East and corner">East and corner</option>\
                                          <option value="75">75%</option>\
                                          <option value="other">Other</option>\
                                        </select>\
                                    </div>\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                          </div>';
        $("#purchaseDetailsContent .unitCardAppend").append(unitCardHtml);
        $('input[name="property-q'+uId+'"]').on("click", function (e) {

          var checkbox = $(this);
          if (!checkbox.is(":checked")){
              // do the confirmation thing here
              e.preventDefault();
              return false;
          }
        });
        $('input[name="property-q'+uId+'"]').on('change', function(e) {
            $('input[name="' + this.name + '"]').not(this).prop('checked', false);
           
            if($("input[name=property-q"+uId+"]:checked").val()=='resell')
            {
                removeFeatureCard();
                if($("input[name=nri-q]:checked").val()=='No')
                {
                  if($('#bankDetailsContent .bankAcDetails').length <= 0)
                  {
                    addBankAcDetails();
                  }
                }
                else if($("input[name=nri-q]:checked").val()=='Yes')
                {
                  if($('#bankDetailsContent .nroAcCheckbox').length <= 0)
                  {
                    addNroAcCheckbox();
                  }
                }
                
            }
            else if($("input[name=property-q"+uId+"]:checked").val()=='possession')
            {
                //addFeatureCard();
                removeBankAcDetails();
                removeNroAcRadios();
                removeNroAcCheckbox();
            }
        });
        unitIds++;
        for (var i=unitIds-2; i>=0; i--)
        {
          $("#ucCardAddBtn"+i).css("display","none");
        } 
        $.material.init();
   }

   function removeUnit(_this)
   {    
      $(_this).parent('.unitCard').remove();
      $(".ucCardAddBtn").last().css("display","block");
   }

   function addFeatureCard()
   {
        var featureCardHtml='<div class="col-md-12 featureCard">\
                            <div class="col-md-12">\
                              <span class="featureCardLabel">PREMIUM FEATURES FOR POSSESSION APPLICANTS</span>\
                            </div>\
                            <div class="col-md-6">\
                              <div class="row">\
                                <div class="col-md-12">\
                                  <label class="marginTop30">For Plots &amp; Villas</label>\
                                </div>\
                              </div>\
                              <div class="row">\
                                <div class="col-md-6">\
                                  <div class="form-group">\
                                    <div class="checkbox">\
                                      <label>\
                                        <input type="checkbox" name=""> East Facing\
                                      </label>\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="col-md-6">\
                                  <div class="form-group">\
                                    <div class="checkbox">\
                                      <label>\
                                        <input type="checkbox" name=""> Corner Plot\
                                      </label>\
                                    </div>\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                            <div class="col-md-6">\
                              <div class="row">\
                                <div class="col-md-12">\
                                  <label class="marginTop30">For Apartments</label>\
                                </div>\
                              </div>\
                              <div class="row">\
                                <div class="col-md-6">\
                                  <div class="form-group">\
                                    <div class="checkbox">\
                                      <label>\
                                        <input type="checkbox" name=""> Penthouse\
                                      </label>\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="col-md-6">\
                                  <div class="form-group">\
                                    <input type="text" class="form-control" id="other-pType" placeholder="Others specify here">\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                          </div>';
        $('#purchaseDetailsContent .featureCardWrapper').append(featureCardHtml).show('slow');
        $.material.init();
   }

   function removeFeatureCard()
   {
       $('#purchaseDetailsContent .featureCardWrapper').hide('slow',function(){
            $('#purchaseDetailsContent .featureCard').remove(); 
       });    
   }

   function addBankAcDetails()
   {
      var className="";
      var label="Select a saved Bank Detail";
      if($.isEmptyObject(data) && !data.bankDetails)
      {
        className='disabled=""';
        label='No saved details found';
      }
          var bankAcDetailsHtml='<div class="col-md-12 bankAcDetails">\
                            <div class="col-md-12">\
                              <div class="form-group">\
                                <label for="savedBanks" class="col-md-3 control-label">Saved Bank Details</label>\
                                <div class="col-md-9">\
                                  <div class="form-group" style="margin:0;">\
                                    <select id="savedBanks" class="form-control" '+ className +'>\
                                      <option value="select">'+ label +'</option>\
                                      <option value="Individual">A/C No 9876456789797</option>\
                                      <option value="Partnership">A/C No 9876776789797</option>\
                                      <option value="Ltd. Company">A/C No 888777777777</option>\
                                      <option value="LLP">A/C No 6875674675875</option>\
                                      <option value="Trust">A/C No 6454342453548769</option>\
                                    </select>\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                            <div class="col-md-12 text-center" style="color:#558b2f;">\
                              ---------- <strong>OR</strong> ----------\
                            </div>\
                            <div class="col-md-7">\
                              <div class="form-group">\
                                <label for="bankAcNo" class="col-md-3 control-label">Bank Account Number</label>\
                                <div class="col-md-9">\
                                  <input type="text" class="form-control" id="bankAcNo" name="bankAcNo" placeholder="Enter bank account number">\
                                </div>\
                              </div>\
                              <div class="form-group">\
                                <label for="confirmBankAcNo" class="col-md-3 control-label">Confirm Account Number</label>\
                                <div class="col-md-9">\
                                  <input type="text" class="form-control" id="confirmBankAcNo" name="confirmBankAcNo" placeholder="Re-enter bank account number">\
                                </div>\
                              </div>\
                              <div class="form-group">\
                                <label for="bankName" class="col-md-3 control-label">Bank Name</label>\
                                <div class="col-md-9">\
                                  <input type="text" class="form-control" id="bankName" name="bankName" placeholder="Enter bank name" readonly>\
                                </div>\
                              </div>\
                            </div>\
                            <div class="col-md-5">\
                              <div class="form-group">\
                                <label for="ifscCode" class="col-md-3 control-label">IFSC</label>\
                                <div class="col-md-9">\
                                  <input type="text" class="form-control" id="ifscCode" name="ifscCode" placeholder="Enter IFSC">\
                                </div>\
                              </div>\
                              <div class="form-group">\
                                <label for="acHolder" class="col-md-3 control-label">Account Holder\'s Name</label>\
                                <div class="col-md-9">\
                                  <input type="text" class="form-control" id="acHolder" name="acHolder" placeholder="Full name as per bank records">\
                                </div>\
                              </div>\
                              <div class="form-group">\
                                <label for="branchName" class="col-md-3 control-label">Branch Name</label>\
                                <div class="col-md-9">\
                                  <input type="text" class="form-control" id="branchName" name="branchName" placeholder="Enter branch name" readonly>\
                                </div>\
                              </div>\
                            </div>\
                          </div>'; 
          $('#bankDetailsContent .bankAcDetailsWrapper').append(bankAcDetailsHtml).show('slow');
          $.material.init();
      
   }
   function addNomineeList()
   {
    var className="";
    var label="Select a saved Bank Detail";
    if($.isEmptyObject(data) && !data.nomineeDetails)
    {
      className='disabled=""';
      label='No saved details found';
    }
    var nListHtml='<div class="col-md-12">\
                          <div class="form-group">\
                            <label for="savedNominees" class="col-md-3 control-label">Saved Nominees</label>\
                            <div class="col-md-9">\
                              <div class="form-group" style="margin:0;">\
                                <select id="savedNominees" class="form-control"'+ className +'>\
                                  <option value="select">'+ label +'</option>\
                                  <option value="Individual">Devansh</option>\
                                  <option value="Partnership">Rajarshi</option>\
                                  <option value="Ltd. Company">Ajay</option>\
                                </select>\
                              </div>\
                            </div>\
                          </div>\
                        </div>';
    $('#nomineeDetailsContent .savedNomineesList').append(nListHtml).show('slow');
    $.material.init();
   }
   $(document).on('change','#bankDetailsContent #ifscCode',function(){
    var ifsc=$(this).val();
      $.ajax({
        'url':'http://api.techm.co.in/api/ifsc/'+ifsc,
        'dataType':'json',
        'success':function(response){
          var response=JSON.parse(JSON.stringify(response));
          if(response.length)
          {
            //alert(response.BRANCH);
            $('#bankDetailsContent #bankName').val(response[0].BANK);
            $('#bankDetailsContent #branchName').val(response[0].BRANCH+' , '+response[0].STATE);
            $('#bankDetailsContent #ifscCode').focus();
          }
          else
          {
            alert("This IFSC does not exist!");
            $('#bankDetailsContent #ifscCode').val('');
            $('#bankDetailsContent #bankName').val('');
            $('#bankDetailsContent #branchName').val('');
          }
        },
      });

   });

   function removeBankAcDetails()
   {
        if($('#bankDetailsContent .bankAcDetails').length > 0)
        {
            $('#bankDetailsContent .bankAcDetailsWrapper').hide('slow',function(){
                $('#bankDetailsContent .bankAcDetails').remove(); 
           }); 
        }
   }

   function addNroAcRadios()
   {
        var nroAcRadiosHtml='<div class="col-md-9 col-md-offset-3 nroAcRadios marginTop30" style="padding:0;">\
                          <div class="radio radio-primary">\
                            <label>\
                              <input type="radio" name="nro-apply" id="nro-apply1" value="applyOwn" checked="">\
                              I will apply for an NRO Account and keep SmartOwner updated.\
                            </label>\
                          </div>\
                          <div class="radio radio-primary" style="display:block;">\
                            <label>\
                              <input type="radio" name="nro-apply" id="nro-apply2" value="applyHelp">\
                              I want SmartOwner\'s assistance to apply for an NRO Account.\
                            </label>\
                          </div>\
                        </div>'; 
        $('#bankDetailsContent .nroAcRadiosWrapper').append(nroAcRadiosHtml).show('slow');
        $.material.init();
   }

   function removeNroAcRadios()
   {
        if($('#bankDetailsContent .nroAcRadios').length > 0)
        {
            $('#bankDetailsContent .nroAcRadiosWrapper').hide('slow',function(){
                $('#bankDetailsContent .nroAcRadios').remove(); 
           });
        } 
   }

   function addNroAcCheckbox()
   {
        var NroAcCheckboxHtml='<div class="col-md-8 nroAcCheckbox">\
                          <div class="col-md-6">\
                            <div class="form-group">\
                              <div class="checkbox">\
                                <label>\
                                  <input type="checkbox" name="nro-q" value="Yes"> I have an NRO Account\
                                </label>\
                              </div>\
                            </div>\
                          </div>\
                          <div class="col-md-6">\
                            <div class="form-group">\
                              <div class="checkbox" style="float:left;">\
                                <label>\
                                  <input type="checkbox" name="nro-q" value="No"> I do not have an NRO Account\
                                </label>\
                              </div>\
                              <i class="material-icons" style="color:#00acc1;font-size:14px;cursor:pointer;padding-top:14px;padding-left:10px;" data-toggle="popover" data-trigger="hover" title="Popover title" data-content="And here\'s some amazing content. It\'s very engaging. Right?">help</i>\
                            </div>\
                          </div>\
                        </div>'; 
        $('#bankDetailsContent .nroAcCheckboxWrapper').append(NroAcCheckboxHtml).show('slow');
        $.material.init();
        $('[data-toggle="popover"]').popover();
   }

   function removeNroAcCheckbox()
   {
        if($('#bankDetailsContent .nroAcCheckbox').length > 0)
        {
            $('#bankDetailsContent .nroAcCheckboxWrapper').hide('slow',function(){
                $('#bankDetailsContent .nroAcCheckbox').remove(); 
           });
        } 
   }

   function removeAllThree()
   {
       
        
        removeNroAcCheckbox();
        removeNroAcRadios();
        removeBankAcDetails();
       
   }

   function addMinorDetails()
   {
        var minorDetailsHtml='<div class="row minorDetails">\
                          <div class="col-md-12 marginTop30">\
                            <strong>NOMINEE IS A MINOR, PLEASE FILL GUARDIAN\'S DETAILS</strong>\
                          </div>\
                          <form id="guardianDetailsForm" class="form-horizontal">\
                          <div class="col-md-12">\
                            <div class="row">\
                              <div class="col-md-7">\
                                <div class="form-group">\
                                  <label for="gaurdianName" class="col-md-3 control-label">Name of Gaurdian</label>\
                                  <div class="col-md-9">\
                                    <input type="text" class="form-control" id="gaurdianName" name="gaurdianName" placeholder="Enter Name of the guardian">\
                                  </div>\
                                </div>\
                                <div class="form-group">\
                                  <label for="guardianEmailId" class="col-md-3 control-label">Email ID</label>\
                                  <div class="col-md-9">\
                                    <input type="email" class="form-control" id="guardianEmailId" name="guardianEmailId" placeholder="Enter a valid Email Id">\
                                  </div>\
                                </div>\
                              </div>\
                              <div class="col-md-5">\
                                <div class="form-group">\
                                  <label for="guardianRelationship" class="col-md-3 control-label">Relationship with Nominee</label>\
                                  <div class="col-md-9">\
                                    <input type="text" class="form-control" id="guardianRelationship" name="guardianRelationship" placeholder="Enter relationship">\
                                  </div>\
                                </div>\
                                <div class="form-group">\
                                  <label for="guardianPhoneNumber" class="col-md-3 control-label">Phone</label>\
                                  <div class="col-md-9">\
                                    <input type="tel" class="form-control" id="guardianPhoneNumber" name="guardianPhoneNumber" placeholder="Enter a valid phone number">\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                            <div class="row">\
                              <div class="col-md-12">\
                                <div class="form-group">\
                                  <label for="guardianAddress" class="col-md-2 control-label">Area/Locality</label>\
                                  <div class="col-md-10">\
                                    <input type="text" onFocus="geolocate()" class="form-control" id="guardianLocality">\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                            <div class="row">\
                              <div class="col-md-12">\
                                <div class="form-group">\
                                  <label for="guardianAddress" class="col-md-2 control-label">Mailing Address</label>\
                                  <div class="col-md-10">\
                                    <input type="text" class="form-control" id="guardianAddress" name="guardianAddress">\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                            <div class="row">\
                              <div class="col-md-7">\
                                <div class="form-group">\
                                  <label for="guardianStreet" class="col-md-3 control-label">Street</label>\
                                  <div class="col-md-9">\
                                    <input type="text" class="form-control" id="guardianStreet" name="guardianStreet" placeholder="Enter street name">\
                                  </div>\
                                </div>\
                              </div>\
                              <div class="col-md-5">\
                                <div class="form-group">\
                                  <label for="guardianCity" class="col-md-3 control-label">City</label>\
                                  <div class="col-md-9">\
                                    <input type="text" class="form-control" id="guardianCity" name="guardianCity" placeholder="Enter city">\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                            <div class="row">\
                              <div class="col-md-5">\
                                <div class="form-group">\
                                  <label for="guardianCountry" class="col-md-4 control-label">Country</label>\
                                  <div class="col-md-8">\
                                    <input type="text" class="form-control" id="guardianCountry" name="guardianCountry">\
                                  </div>\
                                </div>\
                              </div>\
                              <div class="col-md-2">\
                                <div class="form-group">\
                                  <label for="guardianState" class="col-md-3 control-label">State</label>\
                                  <div class="col-md-9">\
                                    <input type="text" class="form-control" id="guardianState" name="guardianState">\
                                  </div>\
                                </div>\
                              </div>\
                              <div class="col-md-5">\
                                <div class="form-group">\
                                  <label for="guardianPinCode" class="col-md-3 control-label">Postal Code</label>\
                                  <div class="col-md-9">\
                                    <input type="text" class="form-control" id="guardianPinCode" name="guardianPinCode" placeholder="Enter your postal code">\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                          </div>\
                          </form>\
                        </div>';
        $('#nomineeDetailsContent .minorDetailsWrapper').append(minorDetailsHtml).show('slow');
        $("#guardianPhoneNumber").intlTelInput({nationalMode: false,autoPlaceholder: false,utilsScript: "js/utils.js"});
        $("#guardianDetailsForm").validate({
        rules: {
            "gaurdianName":"required",
            "guardianPhoneNumber":{
              validatePhone: true,
              required:true
                          },
            "guardianEmailId":"required",
            "guardianRelationship":"required",
            "guardianAddress":"required",
            "guardianCity":"required",
            "guardianCountry":"required",
            "guardianState":"required",
            "guardianPinCode":"required",
        },
        errorPlacement: function(error, element) {
                    if(element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } 
                      else if (element.attr("type") == "tel") {
                            error.insertAfter($(element).parents('div.intl-tel-input'));
                            //$("div.contactformfooter").find(".help-block").css({"margin-top":"-15px","margin-bottom":"0"});
                        }
                      else
                        {
                        
                        error.insertAfter(element);
                        }
            }
        });
        $("#guardianDetailsForm").validate().checkForm();
        $.material.init();
        initAutocomplete();
   }

   function removeMinorDetails()  
   {
        if($('#nomineeDetailsContent .minorDetails').length > 0)
        {
            $('#nomineeDetailsContent .minorDetailsWrapper').hide('slow',function(){
                $('#nomineeDetailsContent .minorDetails').remove(); 
           });
        } 
   }

   function addOtherOptions()
   {
      $('#personalDetailsContent .otherOptions').empty();
      var incHtml='<div class="form-group">\
                            <label for="dob" class="col-md-3 control-label">Date of Incorpration</label>\
                            <div class="col-md-9">\
                              <input type="text" class="form-control" id="doInc" name="doInc" placeholder="Enter date of Incorporation">\
                            </div>\
                          </div>';
      $('#personalDetailsContent .otherOptions').append(incHtml).show('slow');
      if (!$.isEmptyObject(data) && data.personalDetails.dateOfIncorporation)
        {
          var str=data.personalDetails.dateOfIncorporation;
          var dd=str.substr(0,2);
          var mm=str.substr(str.indexOf("-")+1,2);
          var yy=str.substr(str.lastIndexOf("-")+1,4);
            $("#doInc").AnyPicker(
            {
                mode: "datetime",
                showComponentLabel: true,
                dateTimeFormat: "MMM dd, yyyy",
                minValue: new Date(1900, 01, 19),
                onSetOutput: function(sOutput, oSelectedValues)
                    {
                       ageValidation(sOutput,"dob");
                    },
                onInit: function()
                  {
                    oAP1 = this;
                    oAP1.setSelectedDate(new Date(yy,mm-1,dd,00,00,00));
                  }
            });
        }
        else
        {
         
            $("#doInc").AnyPicker(
            {
                mode: "datetime",
                showComponentLabel: true,
                dateTimeFormat: "MMM dd, yyyy",
                minValue: new Date(1900, 01, 19),
                onSetOutput: function(sOutput, oSelectedValues)
                    {
                       ageValidation(sOutput,"dob");
                    }
            });
        }
      $('#personalDetailsContent .indivisualOptions').empty();
      $.material.init();
      $("#panNumber").focus();

   }
    function addIndivisualOptions()
   {
      $('#personalDetailsContent .indivisualOptions').empty();
      var indiHtml='<div class="form-group">\
                            <label for="dob" class="col-md-3 control-label">Date of Birth</label>\
                            <div class="col-md-9">\
                              <input type="text" class="form-control" id="dob" name="dob" placeholder="Enter date of birth">\
                            </div>\
                          </div>\
                          <div class="form-group">\
                            <label for="gender" class="col-md-3 control-label">Gender</label>\
                            <div class="col-md-9">\
                              <div class="form-group" style="margin:20px 0 0 0;">\
                                <div class="radio">\
                                  <label>\
                                    <input type="radio" name="gender" value="male" checked="">\
                                    Male\
                                  </label>\
                                </div>\
                                <div class="radio">\
                                  <label>\
                                    <input type="radio" name="gender" value="female">\
                                    Female\
                                  </label>\
                                </div>\
                              </div>\
                            </div>\
                          </div>\
                          <div class="form-group">\
                            <label for="nri-q" class="col-md-3 control-label">Are you an NRI?</label>\
                            <div class="col-md-9">\
                              <div class="form-group" style="margin:20px 0 0 0;">\
                                <div class="radio">\
                                  <label>\
                                    <input type="radio" name="nri-q" value="Yes">\
                                    Yes\
                                  </label>\
                                </div>\
                                <div class="radio">\
                                  <label>\
                                    <input type="radio" name="nri-q" value="No">\
                                    No\
                                  </label>\
                                </div>\
                              </div>\
                            </div>\
                          </div>';
      $('#personalDetailsContent .indivisualOptions').append(indiHtml).show('slow');
      if (!$.isEmptyObject(data) && data.personalDetails.dob)
        {
          var str=data.personalDetails.dob;
          var dd=str.substr(0,2);
          var mm=str.substr(str.indexOf("-")+1,2);
          var yy=str.substr(str.lastIndexOf("-")+1,4);
            $("#dob").AnyPicker(
            {
                mode: "datetime",
                showComponentLabel: true,
                dateTimeFormat: "MMM dd, yyyy",
                minValue: new Date(1900, 01, 19),
                onSetOutput: function(sOutput, oSelectedValues)
                    {
                       ageValidation(sOutput,"dob");
                    },
                onInit: function()
                  {
                    oAP1 = this;
                    oAP1.setSelectedDate(new Date(yy,mm-1,dd,00,00,00));
                  }
            });
        }
        else
        {
         
            $("#dob").AnyPicker(
            {
                mode: "datetime",
                showComponentLabel: true,
                dateTimeFormat: "MMM dd, yyyy",
                minValue: new Date(1900, 01, 19),
                onSetOutput: function(sOutput, oSelectedValues)
                    {
                       ageValidation(sOutput,"dob");
                    }
            });
        }
      $('#personalDetailsContent .otherOptions').empty();
      if(!$.isEmptyObject(data) && data.personalDetails.gender)
      {
        $('input[name=gender][value="' + data.personalDetails.gender + '"]').prop('checked', true);  
      }
      else
      {
        $('input[name=gender][value="male"]').prop('checked', true); 
      }
      if(!$.isEmptyObject(data) && data.personalDetails.nri)
      {
        $('input[name=nri-q][value="' + data.personalDetails.nri + '"]').prop('checked', true);
      }
      else
      {
        $('input[name=nri-q][value="No"]').prop('checked', true);
      }
      $.material.init();
      $("#panNumber").focus();

   }

   function ageValidation(dateOfBirth,str)
   {
        if(str=="nomineeDob")
        {
           removeMinorDetails();
            var age=moment().diff(dateOfBirth, 'years');
            if(age < 18)
            {
               addMinorDetails();
            }
        }
   }

   $('#accordion').on('show.bs.collapse', function () {
      $('#accordion .in').collapse('hide');
    });
   $(document).on('change','#panNumber',function(){
        var addParam = function(url, param, value) {
         var a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/gi;
         var params = {}, match, str = []; a.href = url;
         while (match = regex.exec(a.search))
             if (encodeURIComponent(param) != match[1]) 
                 str.push(match[1] + (match[2] ? "=" + match[2] : ""));
         str.push(encodeURIComponent(param) + (value ? "=" + encodeURIComponent(value) : ""));
         a.search = str.join("&");
         return a.href;
      }

      url = window.location.href;
      url = addParam(url, "pan", $("#panNumber").val());
      url = addParam(url, "typeOfClient", $("#toc").val());
      window.history.pushState("", "", url);
    });

  $(document).on('change','#toc',function(){
    var addParam = function(url, param, value) {
     var a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/gi;
     var params = {}, match, str = []; a.href = url;
     while (match = regex.exec(a.search))
         if (encodeURIComponent(param) != match[1]) 
             str.push(match[1] + (match[2] ? "=" + match[2] : ""));
     str.push(encodeURIComponent(param) + (value ? "=" + encodeURIComponent(value) : ""));
     a.search = str.join("&");
     return a.href;
  }

  url = window.location.href;
  url = addParam(url, "pan", $("#panNumber").val());
  url = addParam(url, "typeOfClient", $("#toc").val());
  window.history.pushState("", "", url);
    if($('#toc').val()=='Individual')
    {
      removeNroAcRadios();
      removeBankAcDetails();
      removeNroAcCheckbox();
      addIndivisualOptions();
      selNri=$('input[name=nri-q]:checked', '#personalDetailsForm').val();
      if(selNri=="Yes")
      {
          addNroAcCheckbox();
      }
      else
      {
          setTimeout(addBankAcDetails,1000);
      }
    }
    else
    {
      addOtherOptions();
      removeNroAcRadios();
      removeBankAcDetails();
      removeNroAcCheckbox();
      setTimeout(addBankAcDetails,1000);
      
    }
  });
  $(document).on('change','#savedBanks',function(){
    if($("#savedBanks").val()=='select')
    {
      $("#bankDetailsForm #bankAcNo").val("");
      $("#bankDetailsForm #ifscCode").val("");
      $("#bankDetailsForm #acHolder").val("");
      $("#bankDetailsForm #branchName").val("");
      $("#bankDetailsForm #bankName").val("");
    }
    else
    {
      if(data.bankDetails.accountNumber)
      {
        $("#bankDetailsForm #bankAcNo").val(data.bankDetails.accountNumber)
      }
      if(data.bankDetails.ifscCode)
      {
        $("#bankDetailsForm #ifscCode").val(data.bankDetails.ifscCode)
      }
      if(data.bankDetails.accountHolderName)
      {
        $("#bankDetailsForm #acHolder").val(data.bankDetails.accountHolderName)
      }
      if(data.bankDetails.branchName)
      {
        $("#bankDetailsForm #branchName").val(data.bankDetails.branchName)
      }
      if(data.bankDetails.bankName)
      {
        $("#bankDetailsForm #bankName").val(data.bankDetails.bankName)
      }
    }
    $("#bankDetailsForm #bankAcNo").focus();
  });
  $(document).on('change','#savedNominees',function(){
    if($("#savedNominees").val()=='select')
    {
      $("#nomineeName,#nomineeEmailId,#nomineePhoneNumber,#nomineeDob,#nomineeRelationship,#nomineeAddress,#nomineePinCode,#nomineeCountry,#nomineeCity,#nomineeState,#nomineeStreet").val("");
    }
    else
    {
      $("#nomineeDetailsForm #nomineeName").val(data.nomineeDetails.name);
      $("#nomineeDetailsForm #nomineeEmailId").val(data.nomineeDetails.emailId);
      $("#nomineeDetailsForm #nomineePhoneNumber").intlTelInput("setNumber", data.nomineeDetails.phone);
      $("#nomineeDetailsForm #nomineeRelationship").val(data.nomineeDetails.relationship).trigger("change");
      $("#nomineeDetailsForm #nomineeAddress").val(data.nomineeDetails.address); 
      $("#nomineeDetailsForm #nomineePinCode").val(data.nomineeDetails.pinCode);
      $("#nomineeDetailsForm #nomineeCountry").val(data.nomineeDetails.country);
      $("#nomineeDetailsForm #nomineeCity").val(data.nomineeDetails.city);
      $("#nomineeDetailsForm #nomineeState").val(data.nomineeDetails.state);
      if(!$.isEmptyObject(data) && data.nomineeDetails.street)
      {
        $("#nomineeDetailsForm #nomineeStreet").val(data.nomineeDetails.street);
      }
      if(!$.isEmptyObject(data) && data.nomineeDetails.gender)
      {
        $('input[name=nomineeGender][value="' + data.nomineeDetails.gender + '"]').prop('checked', true);  
      }
      $("#nomineeDetailsForm #nomineeDob").val(data.nomineeDetails.dob);
    }
    $("#nomineeDetailsForm #nomineeName").focus();
  });

 $('input[name="copyAddress"]').on("click", function (e) {

      var checkbox = $(this);
      if (!checkbox.is(":checked"))
      {
        $("#nomineeDetailsForm #nomineeAddress").val(""); 
        $("#nomineeDetailsForm #nomineeLocality").val(""); 
        $("#nomineeDetailsForm #nomineePinCode").val("");
        $("#nomineeDetailsForm #nomineeCountry").val("");
        $("#nomineeDetailsForm #nomineeCity").val("");
        $("#nomineeDetailsForm #nomineeState").val("");
        $("#nomineeDetailsForm #nomineeStreet").val("");
        $("#nomineeDetailsForm #nomineeName").focus();
      }
      else
      {
        $("#nomineeDetailsForm #nomineeAddress").val($("#personalDetailsForm #address").val()); 
        $("#nomineeDetailsForm #nomineeLocality").val($("#personalDetailsForm #locality").val()); 
        $("#nomineeDetailsForm #nomineePinCode").val($("#personalDetailsForm #pinCode").val());
        $("#nomineeDetailsForm #nomineeCountry").val($("#personalDetailsForm #country").val());
        $("#nomineeDetailsForm #nomineeCity").val($("#personalDetailsForm #city").val());
        $("#nomineeDetailsForm #nomineeState").val($("#personalDetailsForm #state").val());
        $("#nomineeDetailsForm #nomineeStreet").val($("#personalDetailsForm #street").val());
        $("#nomineeDetailsForm #nomineeName").focus();
      }
  });

  function fillDetails()
  {
    $("#personalDetailsForm #panNumber").val(data.personalDetails.pan);
    $("#personalDetailsForm #emailId").val(data.personalDetails.emailId);
    $("#personalDetailsForm #clientName").val(data.personalDetails.clientName);
    $("#personalDetailsForm #phoneNumber").intlTelInput("setNumber", data.personalDetails.phone);
    $("#personalDetailsForm #toc").val(data.personalDetails.selectedTypeOfClient).trigger("change");
    $("#personalDetailsForm #address").val(data.personalDetails.address);
    $("#personalDetailsForm #city").val(data.personalDetails.city);
    $("#personalDetailsForm #country").val(data.personalDetails.country);
    $("#personalDetailsForm #state").val(data.personalDetails.state);
    $("#personalDetailsForm #pinCode").val(data.personalDetails.pinCode);
    if(data.personalDetails.street)
    {
      $("#personalDetailsForm #street").val(data.personalDetails.street);
    }
    setTimeout(focusInput,1000);
    $("#documentDetailsContent .uploadPanel .panel-heading").html($("#toc").val());
    var documentHtml='';
    data.documents.forEach( function (document,index)
    {
        documentHtml='<div class="col-md-6">\
                            <div class="form-group">\
                              <label for="passport-nri" class="col-md-4 control-label">'+ document.name +'</label>\
                              <div class="col-md-8 image-preview dropzone" id="image-preview-'+index+'">\
                                <input type="file" id="document-'+index+'">\
                              </div>\
                            </div>\
                          </div>'+documentHtml;   
    });
    documentHtml=documentHtml+'<div class="col-md-12">\
                                <div class="form-group help-block">\
                                  NOTE - Each document must be less than 1MB. Allowed formats are JPEG, PNG, PDF, DOC, DOCX.\
                                </div>\
                              </div>';
    $("#documentDetailsContent .uploadPanel .panel-body").append(documentHtml);
    data.documents.forEach( function (document,index)
    {
        $("#image-preview-"+index).dropzone({
        url:"./uploads",
        maxFilesize: 2,   // Default: .image-upload
        uploadMultiple: false,  // Default: .image-preview
        addRemoveLinks: true,    // Default: .image-label
        clickable: false,   // Default: Choose File
        maxFiles: 1,  // Default: Change File
        acceptedFiles: "image/*,application/pdf,doc,docx"
      });
    });

  }
  function focusInput()
  {
    $("#panNumber").focus();
  }
  $('.collapse').on('hidden.bs.collapse', function () {
    $(this).siblings(".panel-heading").children("h4").children("a").children(".material-icons").text("add");
  });
  $('.collapse').on('shown.bs.collapse', function () {
    $(this).siblings(".panel-heading").children("h4").children("a").children(".material-icons").text("remove");
  })
});