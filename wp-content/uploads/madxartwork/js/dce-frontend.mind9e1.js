
/*ajaxmodal.min.js*/
;var urlAttuale;var titoloAttuale;var ajaxPage_init=function(elementSettings,scopeId){var tid=elementSettings.ajax_page_template;if(jQuery('#dce-wrap').length==0){jQuery('body').addClass('dce-ajax-page-open');jQuery('body').wrapInner('<div id="dce-outer-wrap"><div id="dce-wrap"></div></div>')}
jQuery('.ajax-open[data-id='+scopeId+']').on('click','.dce-wrapper a',function(e){urlAttuale=location.pathname;titoloAttuale=document.title;jQuery('body').addClass('modal-p-'+scopeId);var modale='<div class="modals-p modals-p-'+scopeId+'"><div class="wrap-p"><div class="modal-p"></div><a href="'+urlAttuale+'" class="close"><span class="dce-quit-ics"></span></a></div></div>';var loading='<div class="load-p"></div>';var linkHref=jQuery(this).attr('href');jQuery('body').append(modale).append(loading);newLocation=linkHref;jQuery.ajax({url:dceAjaxPath.ajaxurl,dataType:"html",type:'POST',data:{'action':'modale_action','post_href':linkHref,'template_id':tid},error:function(){erroreModale()},success:function(data,status,xhr){var $result=data;riempiModale($result,linkHref,scopeId)},});jQuery('.modals-p .wrap-p').find('.close').on('click',function(e){var linkHref=jQuery(this).attr('href');chiudiModale(linkHref,scopeId);return!1});jQuery(document).on('keyup',function(e){if(e.keyCode==27){chiudiModale(urlAttuale,scopeId)}});return!1})}
function googleAnalytics_view(path,title,scopeId){ga('set',{page:path,title:title});ga('send','pageview')}
function riempiModale(data,url,scopeId){if(0!=data){var posScroll=jQuery('body').scrollTop();jQuery('.load-p').remove();var titoloPagina=jQuery(data).find('.titolo-nativo').text();var quelloCheVoglio=jQuery(data).filter('.content-p');quelloCheVoglio.find('.titolo-nativo').remove();jQuery('body').addClass('modal-p-on');jQuery('.modals-p-'+scopeId+' .modal-p').html(quelloCheVoglio);jQuery('body.modal-p-on.modal-p-'+scopeId+' .wrap-p .modal-p').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(el){jQuery('html, body').addClass('no-scroll');jQuery('body').addClass('cancella-body')});var element_el=quelloCheVoglio.find('.madxartwork-element');element_el.each(function(i){var el=jQuery(this).data('element_type');madxartworkFrontend.elementsHandler.runReadyTrigger(jQuery(this))});var stateObj={url:"bar"};if(url!=window.location){var elementSettings=get_Dyncontel_ElementSettings(jQuery(this));if(elementSettings.change_url){window.history.pushState(null,null,url)}
document.title=titoloPagina}}}
function chiudiModale(url,scopeId){jQuery('html, body').removeClass('no-scroll');jQuery('body').removeClass('modal-p-on cancella-body').addClass('modal-p-off');jQuery('body.modal-p-off.modal-p-'+scopeId+' .wrap-p .modal-p').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(el){jQuery(document).off('keyup');jQuery('.modals-p .wrap-p').find('.close').off('click');jQuery('.modals-p-'+scopeId).remove();jQuery(el.currentTarget).off('webkitAnimationEnd oanimationend msAnimationEnd animationend');if(url!=window.location){window.history.pushState(null,null,url);document.title=titoloAttuale}});jQuery('body.modal-p-off.modal-p-'+scopeId+' #dce-wrap').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(el){jQuery('body').removeClass('modal-p-off modal-p-'+scopeId);jQuery(el.currentTarget).off('webkitAnimationEnd oanimationend msAnimationEnd animationend')})}
function erroreModale(){jQuery('.modals-p').html('<p>An error has occurred</p>')}
function requestContent(file){jQuery('.content').load(file+' .content')}(function($){$(window).on('madxartwork/frontend/init',function(){if(jQuery('.ajax-open').length>0){jQuery('.ajax-open').each(function(i,el){var elementSettings_ajaxOpen=get_Dyncontel_ElementSettings(jQuery(this));ajaxPage_init(elementSettings_ajaxOpen,jQuery(this).attr('data-id'))})}})})(jQuery)
/*dce-settings.min.js*/
;function get_Dyncontel_ElementSettings($element){var elementSettings=[];var modelCID=$element.data('model-cid');if(madxartworkFrontend.isEditMode()&&modelCID){var settings=madxartworkFrontend.config.elements.data[modelCID];var type=settings.attributes.widgetType||settings.attributes.elType;var settingsKeys=madxartworkFrontend.config.elements.keys[type];if(!settingsKeys){settingsKeys=madxartworkFrontend.config.elements.keys[type]=[];jQuery.each(settings.controls,function(name,control){if(control.frontend_available){settingsKeys.push(name)}})}
jQuery.each(settings.getActiveControls(),function(controlKey){if(-1!==settingsKeys.indexOf(controlKey)){elementSettings[controlKey]=settings.attributes[controlKey]}})}else{elementSettings=$element.data('settings')||{}}
return elementSettings}(function($){var get_Dyncontel_ElementSettings=function($element){var elementSettings={};var modelCID=$element.data('model-cid');if(madxartworkFrontend.isEditMode()&&modelCID){var settings=madxartworkFrontend.config.elements.data[modelCID];var settingsKeys=madxartworkFrontend.config.elements.keys[settings.attributes.widgetType||settings.attributes.elType];var type=settings.attributes.widgetType||settings.attributes.elType;if(!settingsKeys){settingsKeys=madxartworkFrontend.config.elements.keys[type]=[];jQuery.each(settings.controls,function(name,control){if(control.frontend_available){settingsKeys.push(name)}})}
jQuery.each(settings.getActiveControls(),function(controlKey){if(-1!==settingsKeys.indexOf(controlKey)){elementSettings[controlKey]=settings.attributes[controlKey]}})}else{elementSettings=$element.data('settings')||[]}
return elementSettings}})(jQuery)
/*elements-content.min.js*/
;(function($){var WidgetElements_ContentHandler=function($scope,$){var dcecontent=$scope.find('.dce-content');var dcecontentWrap=$scope.find('.dce-content-wrapper');var dceunfold=$scope.find('.unfold-btn a');var dceunfoldfa=$scope.find('.unfold-btn i.fa-old');var elementSettings=get_Dyncontel_ElementSettings($scope);if(elementSettings.enable_unfold){var originalHeightUnfold=dcecontentWrap.outerHeight();var heightUnfold=elementSettings.height_content.size;jQuery(window).load(function(){dcecontent.addClass('unfolded');if(originalHeightUnfold>heightUnfold){dceunfold.toggle(function(){dcecontent.height(originalHeightUnfold);dceunfoldfa.removeClass('eicon-plus-circle').addClass('eicon-minus-circle')},function(){dcecontent.height(heightUnfold);dceunfoldfa.removeClass('eicon-minus-circle').addClass('eicon-plus-circle')})}else{dcecontent.removeClass('unfolded').addClass('unfold-open');dceunfold.remove()}})}
function onResize(){originalHeightUnfold=dcecontentWrap.outerHeight()}
window.addEventListener("resize",onResize)};$(window).on('madxartwork/frontend/init',function(){madxartworkFrontend.hooks.addAction('frontend/element_ready/dyncontel-content.default',WidgetElements_ContentHandler)})})(jQuery)
/*main.min.js*/
;(function($){$(window).on('madxartwork/frontend/init',function(){if(madxartworkFrontend.isEditMode()){madxartwork.channels.editor.on('dceMain:previewPage',function(e,editor){var model=e.getOption('editedElementView').getEditModel(),currentElementType=model.get('elType')})}})})(jQuery)