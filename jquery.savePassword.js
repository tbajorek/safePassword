/*
	MIT License

	Copyright (c) 2016 Tomasz Bajorek <tbajorek3@gmail.com> (www.tbajorek.pl)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

(function($){
	$.fn.safePassword = function(){
		function createInputField(type, name) {
			var input = document.createElement("input");
			input.setAttribute('type', type);
			input.setAttribute('name', name);
			return $(input);
		}

		return this.each(function() {
			var passwordElement = $(this).find('input[type=password]');
			var changedPasswordValue = [];
			var originalValue = [];
			var input = [];
			var form = this;

			passwordElement.each(function(){
				var index = $(this).index();
				var oldPasswordName = $(this).attr('name');
				input[index] = createInputField('hidden', oldPasswordName);
				input[index].appendTo($(form));
				changedPasswordValue[index] = false;
				originalValue[index] = $(this).val();

				$(this).attr('name', oldPasswordName+'_'+Date.now());
				$(form).find('[type=submit]').addClass('safePasswordFormSubmit').attr('type', 'button');
				$(this).on('input', function(){
					if($(this).is(":focus")) {
						input[index].val($(this).val());
						changedPasswordValue[index] = true;
					}
				});
				$(form).find('input').keypress(function(e) {
					if(e.which == 13) {
						$(form).find('.safePasswordFormSubmit').click();
					}
				});

			});

			$(this).find('.safePasswordFormSubmit').click(function(){
				passwordElement.each(function(){
					var index = $(this).index();
					$(this).attr('name','').val('');
					if(!changedPasswordValue[index])
						input[index].val(originalValue[index]);
				});
				$(this).parents('form').submit();
				return false;
			});

		});
	};
})(jQuery);