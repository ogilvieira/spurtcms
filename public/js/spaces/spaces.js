var languagedata
var categoryIds = [];
var spaces = [];
var arraydatacheck =[]
var sdata
/** */
$(document).ready(function(){
    //main menu
    $('.mainmenu').removeClass('active');
    $('.spacemenu').addClass('active');

    $('.mainmenu').each(function(){
        if($(this).hasClass('active')){
          var name = $(this).children('p').text()
          $("#headtitle").text(name)
        }
    })
})

$(document).ready(async function () {

    var languagecode = $('.language-group>button').attr('data-code')

    await $.getJSON("/locales/"+languagecode+".json", function (data) {
        
        languagedata = data
    })

    var tex =   $(".category").text()

    // console.log("Cv",tex);


    $(".category").each(function(i, data){

        // console.log("text",data);
        
     if (data.length > 110){

       return truncate(data, 58) + "...";
      }
      return data;
  
    })

    // $("#spacecategory").text(data) 
});

function truncate(str, no_words) {
    return str.split(" ").splice(0, no_words).join(" ");
  }


$("#cancel-btn").on('click', function () {

    $("#rightModal").hide()
    $('#spaceform')[0].reset();
    $('#spimagehide').attr("src", "")
    $("#spacedel-img").hide();
    $("#save").show();
    $("#update").hide();
    $("label.error").hide();
    $('#spaceform').attr("action", "/spaces/createspace")
    $('#spcname').removeClass('input-group-error');
    $('#spcdes').removeClass('input-group-error');
    $('#grbcat').removeClass('input-group-error')
    $("#catdropdown").removeClass('input-group-error')
})


// input box search
$("#searchcategory").keyup(function () {
    var keyword = $(this).val().trim().toLowerCase()
    $(".channels-list-row button").each(function (index, element) {
    var title = $(element).find('span').text().toLowerCase()

      if (title.includes(keyword)) {
            $(element).show()
        } else {
            $(element).hide()

        }
    })
  
})

// media image insert

// $(document).on('click',".file>img",function () {
//     var src = $(this).find('img').attr("src");
//     var data = $("#spimage").val(src)
//     var data1 = $("#spimagehide").attr("src", src);
    
//     if (data1 != "") {
//         $(".heading-three").hide();
//         $("#browse").hide();
//         $("#spimagehide").attr("src", src).show()
//         $("#spacedel-img").show();
//         $("#addnewimageModal").modal('hide')

//     }
//     $("#rightModal").modal('show')

// })
 

$(document).on("click","#mediamodalclose",function (){
    $("#rightModal").modal('show')

})

// add space
$("#addspace , #clickadd").click(function () {
    $('form[name="newspace"]').attr("action", "/spaces/createspace");
    $("#title").text(languagedata.Spaces.newspace)

    // input values
    $("#spacename").val("")
    $("#spacedescription").val("")
    $("#spimage").val("")
    $("#spimagehide").attr("src", "");
    $("#triggerId").html("")
    $("#triggerId").text(languagedata.Spaces.slectcatgory)
    $("#spacename-error").hide()
    // btns
    $("#uplaodimg").show();
    $("#browse").show();
    $("#spacedel-img").hide()
    $("#save").show();
    $("#clone").hide();
    $("#update").hide();

    $(".input-group").removeClass("input-group-error")

})



function refreshdiv(){
    $('.choose-rel-article').load(location.href + ' .choose-rel-article');
}
$(document).on('click', '#newdd-input', function () {
    $(this).siblings('.dd-c').css('display', 'block')
})

$('#addnewspaceModal').on('click', function (event) {
    if ($('.dd-c').css('visibility') == 'visible' && !$(event.target).is('#newdd-input') && !$(event.target).is('.dd-c')) {
        // $('#newdd-input').prop('checked', false)
        // $('.dd-c').css('display', 'none')
    }
})

// Edit functionaltiy
$("body").on("click", "#edit", function () {

    $(".input-group").removeClass("input-group-error")

    $("#uplaodimg").hide()
    $("#browse").hide()

    var url=window.location.search
    const urlpar= new URLSearchParams(url)
    pageno = urlpar.get('page')
    $("#spacepageno").val(pageno)
    $("#categoryspan").hide()
    $("#spaceform").attr("name", "editspace")
    var data = $(this).attr("data-id");
    var id = $(this).attr("data-cid");
    $("#title").text(languagedata.Spaces.updatespace)
    $("#update").show()
    $("#save").hide()
    $("#clone").hide();

    $('form[name="editspace"]').attr("action", "/spaces/updatespace");
    $("#id").val(data);
    $("#catiddd").val(id)

    var details = $(this).parents(".spaceCard-btm");
    var imgdetails = $(this).parents(".spaceCard-child")
    var spimg = imgdetails.find("img").attr("src")
    var spcat = details.find("#spacecategory").html()
    var spname = details.find("#spacecontentname").text()
    var spdesc = details.find("#spacecontentdesc").text()

    $("#uplaodimg").show();
        $("#browse").show();

    $("#spimagehide").attr("src", spimg)
    if (spimg != "") {
        $("#uplaodimg").hide();
        $("#browse").hide();
        $("#spacedel-img").show();

    }
    // if ($("#spimagehide").attr("src") === "/public/img/space-default-image.png") {
    //     $("#uplaodimg").hide();
        // $("#browse").hide();
    //     $("#spimagehide").attr("src", "");
    // } else {
    //      $("#uplaodimg").hide();
        // $("#browse").hide();
    //     $("#spimage").show();
    //     $("#spacedel-img").show();
    //     // $("#catdel-img").show();
    // }

    $("#triggerId").html(spcat)
    $("#spacename").val(spname.trim())
    $("#spacedescription").val(spdesc.trim())
    // $("#spimage").val(spimg)

    if (spcat != "") {
        $("input[name=spacecategoryvalue]").rules("remove", "required")

    }

});

// $("#rightModal").on('hidden.bs.modal', function () {
//     $("#myModalLabel2").text(languagedata.Spaces.addnewspace)
//     $("#save").show()
//     $("#update").hide()
//     $("#spacename").val("")
//     $("#spacedescription").val("")
//     $("#spimagehide").attr("src", "")
//     $("#spimage").val("")
//     $("#catspace").html("")
//     $("#spacename-error").hide()
//     $("#spacedescription-error").hide()
//     $("#spacecategorys-error").hide()

// })


// $('#rightModal').on('hidden.bs.modal', function (event) {
//     $('#spaceform')[0].reset();
//     $('#spimagehide').attr("src", "")
//     $("#spacedel-img").hide();
//     $("#save").show();
//     $("#update").hide();
//     $("label.error").hide();
//     $('#spaceform').attr("action", "/spaces/createspace")
//     $('#spcname').removeClass('input-group-error');
//     $('#spcdes').removeClass('input-group-error');
//     $('#grbcat').removeClass('input-group-error')
//     $("#dropdown").removeClass('input-group-error')
//     $('.modal-backdrop').remove()
// })



// delete popup 
// $(document).on('click', '#deletespace', function () {
//     var id = $(this).attr("data-id");
//     $.ajax({
//         url: "/spaces/deletepopup",
//         type: "GET",
//         dataType: "json",
//         data: { "id": id, csrf: $("input[name='csrf']").val() },
//         success: function (results) {
//             if (results) {
//                 $('#content').text("Are You Sure You Want To Delete This Space");
//                 $('#delid').show();
//                 $('#delid').parent('#delete').attr('href', '/spaces/deletespace?id=' + id);
//                 $('#btn3').text(languagedata.no);

//             } else {
//                 $('#content').text(languagedata.delroleinvalid);
//                 $('#delid').parent('#delete').attr('href', '');
//                 $('#delid').hide();
//                 $('#btn3').text(languagedata.ok)

//             }
//         }
//     });
// });

// delete popup 
$(document).on('click', '#deletespace', function () {
    var id = $(this).attr("data-id");
    $(".deltitle").text(languagedata.Spaces.deltitle)
    $('.delname').text($(this).parents('tr').find('td:eq(0)').text())
    $('#content').text(languagedata.Spaces.delspace);
    $('#delid').show();
    $('#delete').attr('href', '/spaces/deletespace?id=' + id);
    $("a").attr("id", "")
    $('#btn3').text(languagedata.no);
})

// Clone functionaltiy
$("body").on("click", "#clonebtn", function () {

    $("#spacename-error").hide()
    $("#spacedescription-error").hide()
    $("#uplaodimg").hide()
    $("#browse").hide()
    
    $("#categoryspan").hide()
    $("#spaceform").attr("name", "clonespace")
    var data = $(this).attr("data-id");
    var id = $(this).attr("data-cid")
    $("#title").text(languagedata.Spaces.clonespace)
    $("#clone").show()
    $("#update").hide()
    $("#save").hide()
    $('form[name="clonespace"]').attr("action", "/spaces/clonespace");
    $("#id").val(data);
    $("#catiddd").val(id)

    var details = $(this).parents(".spaceCard-btm");
    var imgdetails = $(this).parents(".spaceCard-child")
    var spimg = imgdetails.find("img").attr("src")
    var spcat = details.find("#spacecategory").html()
    
    var spname = details.find("#spacecontentname").text()
    var spdesc = details.find("#spacecontentdesc").text()

    $("#spimagehide").attr("src", spimg)
    if (spimg != "") {
        $("#uplaodimg").hide();
        $("#browse").hide();
        $("#spacedel-img").show();

    }
    // if ($("#spimage").attr("src") === "/public/img/space-default-image.png") {
    //    $("#uplaodimg").hide();
        // $("#browse").hide();
    //     $("#spimage").attr("src", "");
    // } else {
    //     $("#uplaodimg").hide();
        // $("#browse").hide();
    //     $("#spimage").show();
    //     $("#spacedel-img").show();
    //     // $("#catdel-img").show();
    // }

    $("#triggerId").html(spcat)
    $("#spacename").val(spname.trim())
    $("#spacedescription").val(spdesc.trim())
    // $("#spacecategoryid").val(id)
    // $("#spimagehide").val(spimg)
    // if (spcat != "") {

    //     $("input[name=spacecategoryid]").rules("remove", "required")
    // }

});
$(document).on('click', '.fcheck', function () {
    var categoryId = $(this).closest('.newck-group').find('.para:last').data('id').toString();

    var categoryId1 = $(this).attr("data-check").toString();
      
    var isChecked = $(this).prop('checked');
    if (isChecked) {
        if (categoryId !== "" && categoryId1 !== "") {
            categoryIds.push(categoryId);
            arraydatacheck.push(categoryId1);

        }
    } else {
        categoryIds = categoryIds.filter(function (id) {
            return id != categoryId;
        }); 
        arraydatacheck = arraydatacheck.filter(function (cid) {
            return cid != categoryId1;
        });

    }


    var keyword = $('#spacessearch').val();
    if (categoryIds.length > 0 && arraydatacheck.length > 0) {
        $("#filterid").val(categoryIds);
        window.location.href = "/spaces?keyword=" + keyword + "&categoryid=" + categoryIds.join(",")+ "&check=" + arraydatacheck.join(",");
    } else if (keyword != "") {
        window.location.href = "/spaces?keyword=" + keyword
    } else {
        $("#filterid").val("");
        window.location.href = "/spaces";
    }
});


$('#spacedel-img').click(function () {
    $('input[name=spaceimagepath]').val("")
    $('#spimagehide').attr('src', '')
    $(this).siblings('h3,button').show()
    $(this).hide()
})

$("#save").click(function () {

    jQuery.validator.addMethod("duplicatename", function (value) {

        var result;
        id = $("#id").val()
       
        $.ajax({
            url:"/spaces/checkspacename",
            type:"POST",
            async:false,
            data:{"spacename":value,"id":id,csrf:$("input[name='csrf']").val()},
            datatype:"json",
            caches:false,
            success: function (data) {
                result = data.trim();
            }
        })
        return result.trim()!="true"
    })

    $('#spaceform').validate({
        ignore:[],
        rules: {
            spacename: {
                required: true,
                space: true,
                duplicatename:true
            },
            spacedescription: {
                required: true,
                space: true

            },
            catiddd: {
                required: true
            }
        },
        messages: {
            spacename: {
                required: "* " + languagedata.Spaces.spacenamevalid,
                space: "* " + languagedata.Spaces.spacergx,
                duplicatename:"*" + languagedata.Spaces.namevailderr
            },
            spacedescription: {
                required: "* " + languagedata.Spaces.spacedescvalid,
                space: "* " + languagedata.Spaces.spacergx,
            },
            catiddd: {
                required: "* " + languagedata.Spaces.spacecategoryvalid,

            },

        }
    });

    var formcheck = $("#spaceform").valid();
    if (formcheck == true) {
        $('#spaceform')[0].submit();
    } else {
        Validationcheck()
        $(document).on('keyup', ".field", function () {
            Validationcheck()
        })

        if ($('#catiddd-error').css('display') !== 'none') {
            // $('#grbcat').addClass('input-group-error')
            $("#catdropdown").addClass('input-group-error')

        }
        else {
            // $('#grbcat').removeClass('input-group-error')
            $("#catdropdown").removeClass('input-group-error')

        }
     
         
                          
    }

    return false

})

$("#update").click(function () {
    
    jQuery.validator.addMethod("duplicatename", function (value) {

        var result;
        id = $("#id").val()
       
        $.ajax({
            url:"/spaces/checkspacename",
            type:"POST",
            async:false,
            data:{"spacename":value,"id":id,csrf:$("input[name='csrf']").val()},
            datatype:"json",
            caches:false,
            success: function (data) {
                result = data.trim();
            }
        })
        return result.trim()!="true"
    })
    $('#spaceform').validate({
        ignore:[],

        rules: {
            spacename: {
                required: true,
                space: true,
                duplicatename:true
            },
            spacedescription: {
                required: true,
                space: true

            },
            spacecategoryvalue: {
                required: true
            }
        },
        messages: {
            spacename: {
                required: "* " + languagedata.Spaces.spacenamevalid,
                space: "* " + languagedata.Spaces.spacergx,
                duplicatename:"*" + languagedata.Spaces.namevailderr
            },
            spacedescription: {
                required: "* " + languagedata.Spaces.spacedescvalid,
                space: "* " + languagedata.Spaces.spacergx,
            },
            spacecategoryvalue: {
                required: "* " + languagedata.Spaces.spacecategoryvalid,

            },

        }
    });

  
    var formcheck = $("#spaceform").valid();
    if (formcheck == true) {
        $('#spaceform')[0].submit();
    }
    else {
        Validationcheck()
        $(document).on('keyup', ".field", function () {
            Validationcheck()
        })
        // if ($('#catiddd').val()!==''){
        //     $('#grbcat').addClass('input-group-error')
        //     $("#catdropdown").addClass('input-group-error')

        // }else {
        //     $('#grbcat').removeClass('input-group-error')
        //     $("#catdropdown").removeClass('input-group-error')
        // }
    }

    return false
})

$("#clone").click(function () {
    jQuery.validator.addMethod("duplicatename", function (value) {

        var result;
        id = $("#id").val()
       
        $.ajax({
            url:"/spaces/checkspacename",
            type:"POST",
            async:false,
            data:{"spacename":value,"id":id,csrf:$("input[name='csrf']").val()},
            datatype:"json",
            caches:false,
            success: function (data) {
                result = data.trim();
            }
        })
        return result.trim()!="true"
    })

    $('#spaceform').validate({
        ignore:[],

        rules: {
            spacename: {
                required: true,
                space: true,
                duplicatename:true
            },
            spacedescription: {
                required: true,
                space: true

            },
            spacecategoryvalue: {
                required: true
            }
        },
        messages: {
            spacename: {
                required: "* " + languagedata.Spaces.spacenamevalid,
                space: "* " + languagedata.Spaces.spacergx,
                duplicatename:"*" + languagedata.Spaces.namevailderr
            },
            spacedescription: {
                required: "* " + languagedata.Spaces.spacedescvalid,
                space: "* " + languagedata.Spaces.spacergx,
            },
            spacecategoryvalue: {
                required: "* " + languagedata.Spaces.spacecategoryvalid,

            },

        }
    });

  

    var formcheck = $("#spaceform").valid();
    if (formcheck == true) {
        $('#spaceform')[0].submit();
    }
    else {
        Validationcheck()
        $(document).on('keyup', ".field", function () {
            Validationcheck()
        })
        // if ($('#catiddd').hasClass('error')) {
        //     $("#catdropdown").addClass('input-group-error')
    
        // }
        // else {
        //     $("#catdropdown").removeClass('input-group-error')
    
        // }
       
    }

    return false
})
function checkImage() {
    const spimage = document.getElementById("spimage");
    const spacedel = document.getElementById("spacedel-img");

    // Check if the src attribute is empty
    if (spimage.src === "") {
        spacedel.style.display = "none";
    } else {
        spacedel.style.display = "block";
    }
}

// avoid the last index image

// const image = document.querySelectorAll('.scrollimg ');
// image.forEach(group => {
//     const image = group.querySelectorAll('img');
//     image[image.length - 1].style.display = 'none';
// });

const imagee = document.querySelectorAll('.space-path-list ');
imagee.forEach(group => {
    const image = group.querySelectorAll('img');
    image[image.length - 1].style.display = 'none';
});


const newckGroups = document.querySelectorAll('.spaceformat');
newckGroups.forEach(group => {
    const images = group.querySelectorAll('img');
    images[images.length - 1].style.display = 'none';
});
const images = document.querySelectorAll('.spaceformats');

images.forEach(group => {
    const image = group.querySelectorAll('img');
    image[image.length - 1].style.display = 'none';
});




const spacedes = document.getElementById('spacedescription');
// const spccat = document.getElementById('categorydropdown')
const inputGroup = document.querySelectorAll('.input-group');
const opt = document.querySelectorAll('.select-options')


// spccat.addEventListener('click', () => {

//     spccat.closest('.input-group').classList.add('input-group-focused');

// });

// spccat.addEventListener('blur', () => {

//     spccat.closest('.input-group').classList.remove('input-group-focused');

// });

spacedes.addEventListener('click', () => {

    spacedes.closest('.input-group').classList.add('input-group-focused');

});

spacedes.addEventListener('blur', function () {
    spacedes.closest('.input-group').classList.remove('input-group-focused');
});




// $(document).on('blur','#newdd-input',function(){
//     if ($('#spacecategoryid').val()!== '') {
//         $('#grbcat').removeClass('input-group-error')
//     }
// })


function Validationcheck() {


    if ($('#spacename').hasClass('error')) {
        $('#spcname').addClass('input-group-error');
    } else {
        $('#spcname').removeClass('input-group-error');
    }

    if ($('#spacedescription').hasClass('error')) {
        $('#spcdes').addClass('input-group-error');
    } else {
        $('#spcdes').removeClass('input-group-error');
    }
 
}

$(document).on('click','.close',function(){
    $("#spacedel-img").hide();
    $(".input-group").removeClass("input-group-error")

    $('#spcname').removeClass('input-group-error');
    $('#spcdes').removeClass('input-group-error');
    $('#grbcat').removeClass('input-group-error')
    $('#catdropdown').removeClass('input-group-error')

    $('#catiddd-error').hide()
})

$("#searchrole").keyup(function () {
    var keyword = $(this).val().trim().toLowerCase()
    $(".choose-rel-article .newck-group").each(function (index, element) {
        var title = $(element).find('p').text().toLowerCase()
        if (title.includes(keyword)) {
            $(element).show()
        } else {
            $(element).hide()
        }
    })
})

$(document).on('keyup','#spacessearch',function(){

    if($('.search').val()===""){
        window.location.href ="/spaces"
        
   }
  
})

$(document).on('click','#medcancel',function () {
  $("#addnewimageModal").hide()
})

$(document).ready(function(){

    $(".desclist").each(function (index,element){

        var result= $(this).text()

        if (result?.length <= 129 ) {

             $(this).removeAttr("data-bs-original-title")
        
        }
      

    })


})

var filtercategoryid

$(".searchcategorylist").on("click", function () {
    var Category = $(this).find('.id')
    $.each(Category, function (index, value) {

        if (Category.length - 1) {
            filtercategoryid = $(this).attr("data-id")

        }
    })

    var data = {"categoryid":filtercategoryid }

    var getdata = LoadMoreData(data, space_count, space_array)

     space_array = getdata.array

     space_count = getdata.count
})


var keywordname

$("#searchspacename").keyup(function () {

    keywordname= $(this).val().trim().toLowerCase()

    var data = {"keyword":keywordname}

    var getdata = LoadMoreData(data, space_count, space_array)

     space_array = getdata.array

     space_count = getdata.count
  
})
    


// Scroll paganation

    // var spacelimit = 10

    // var modifier = 1
    
    // var space_offset = 1
    
    var space_array = []
    
    var space_count = 0
  
    // var scrollablediv = document.querySelector('.spaceCards')
    
    // var space_divheight = scrollablediv.scrollHeight
    
    // scrollablediv.addEventListener('scroll', () => {
    
    //   var readOnlyHeight = scrollablediv.offsetHeight
   
    //   var scrollposition = scrollablediv.scrollTop
   
    //   var currentscroll = readOnlyHeight + scrollposition
   
    //   if (currentscroll + modifier > space_divheight) {
    
    //     if (scrollposition >= 140 && scrollposition <= 180) {
    
    //       space_offset = space_offset + 1
    
    //     } 

  
    //     if (space_array.length == 0 || space_array.length < space_count) {

   
    //      var data = { "space_offset": space_offset,"space_limit": spacelimit, "space_scrolldata": true }
    
    //      var getdata = LoadMoreData(data, space_count, space_array)
    
    //       space_array = getdata.array
    
    //       space_count = getdata.count
    
    //     }
    
    //   }

            
    // })
 


    function LoadMoreData(data, count, array) {

        $.ajax({
      
          url: "/spaces/list",
      
          data: data,
      
          async: false,
      
          dataType: "json",
      
          success: (result) => {

            console.log("pagnation",result);

            if (keywordname  !="" || filtercategoryid != "") {

                $(".spaceCards").html("")

                $("#searchcount").text(result.FilterCount)

            }

            if (result.FilterCount == 0){

                var nodatafound = `<div class="noData-foundWrapper">

                <div class="empty-folder">
                    <img src="/public/img/folder-sh.svg" alt="">
                    <img src="/public/img/shadow.svg" alt="">
                </div>
                <h1 class="heading"> `+languagedata.oopsnodata +`</h1>
                <p class="para">
                `+languagedata.pagesorry +`
                `+languagedata.gobackhome +`
                </p>
               
            </div>`

            $('.spaceCards').append(nodatafound)

            }
   
            // if (result.hasOwnProperty('TotalSpaceCount')) {
      
            //   count = result.TotalSpaceCount - 10
      
            // } 


            if (result.hasOwnProperty('SpaceDetails')) {
      
              for (let space of result.SpaceDetails) {
      
                array.push(space)
      
                var childs = ""
      
                if (space.CategoryNames != null) {
      
                  for (let child of  space.CategoryNames) {

                var index=space.CategoryNames.findIndex(Obj => Obj.Id == child.Id)
                       
                   if(index == space.CategoryNames.length-1){

                    childs = childs + `<span>` + child.CategoryName+` </span>`
                   }else{

                    childs = childs + `<span>` + child.CategoryName + ` </span> <img src="/public/img/breadcrumb-arrow.svg" class="img"> `

                   }
                 }
                 
                }


            
                var single_list = `<div class="spaceCard-child">

                <div class="spaceCard-top">
                   <div class="tbl-img-content flexx">
                    <div class="tbl-img">
                        <img src="" alt=""></div>
                    </div>
                </div>

                <div class="spaceCard-btm">

                    <a class="heading-four" href="" id="spacecontentname">
                     `+space.SpacesName+`
                    </a>

                    <div class="card-breadCrumb">
                        <ul class="breadcrumb-container" id="spacecategory">
                            <li> <a href="" class="para-light space-path-list" style="display: flex;gap: 4px;"> `+childs +` </a></li>
                        </ul>
                    </div>

                    <p class="para-extralight desclist" id="spacecontentdesc" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" title="`+ space.SpaceFullDescription+`">
                       `+space.SpacesDescription+`
                    </p>

                    <h6 class="para-extralight">Updated: `+space.ModifiedDate +`</h6>

                    <div class="card-buttonOption">
                        <a href="/spaces/page"> <button class="btn-reg btn-lg primary {{$THEMECOLOR}}">
                                <img src="/public/img/add.svg" alt="" /> Add Page
                            </button></a>

                        <div class="card-option">
                            <div class="btn-group language-group">
                                <button type="button" class="dropdown-tog" data-bs-toggle="dropdown"
                                    aria-expanded="true">
                                    <img src="/public/img/card-option.svg" alt="">
                                    <img src="/public/img/card-option-bg.svg" alt="">
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end " data-popper-placement="bottom-end"
                                    style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 22px);">
                                    <li><button class="dropdown-item" id="clonebtn" type="button"
                                            data-cid="`+space.PageCategoryId+`" data-id=" `+space.Id +` " data-bs-toggle="modal"
                                            data-bs-target="#rightModal"> <span><img src="/public/img/copy.svg"
                                                    alt=""></span> Clone </button></li>
                                    <li><button class="dropdown-item" id="edit" type="button"
                                    data-cid="`+space.PageCategoryId+`" data-id=" `+space.Id +`" data-bs-toggle="modal"
                                    data-bs-target="#rightModal"> <span><img src="/public/img/edit.svg"
                                                    alt=""></span> Edit </button></li>
                                    <li><button class="dropdown-item" id="deletespace" data-id="`+space.Id +`"
                                            type="button" data-bs-toggle="modal" data-bs-target="#centerModal">
                                            <span><img src="/public/img/delete.svg" alt=""></span> Delete </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

              </div> `
      
                $('.spaceCards').append(single_list)
             }
      
            }
          }
        })
      
        return { "array": array, "count": count }
}


$(".categorydropdown").click(function(){

    var text = $(this).html()
    
    var id 

   var Category = $(this).find('.id')

    $.each(Category, function (index, value) {

        if (Category.length - 1) {
          id = $(this).attr("id")
          $("#catiddd").val(id)
        }
    })

     if (id == 0) {
            $("#catdropdown").addClass('input-group-error')

        }else {
            $("#catdropdown").removeClass('input-group-error')
            $("#catiddd-error").css('display', 'none')


        }
    $(this).parent('.dropdown-menu').siblings('a').html($(this).html(text))


})



  