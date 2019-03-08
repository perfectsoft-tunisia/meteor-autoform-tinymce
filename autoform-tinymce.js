Template.autoformTinyMCE.onCreated(function() {
    this.id = this.data.atts ? (this.data.atts.id || Math.random().toString(36).substring(7)) : Math.random().toString(36).substring(7);
});

Template.autoformTinyMCE.onRendered(function() {
    let options = this.data.atts.tinyMCEOptions || {};

    options.selector = '#' + this.id;

    options.setup = function (editor) {
        editor.hide();
    };

    window.tinymce.init(options);

    var editor = window.tinymce.get(this.id);

    editor.once('init', () => {
        editor.initialized = true;
        editor.show();
        if (this.data.value) {
            editor.setContent(this.data.value);
        }
    });


    this.autorun(() => {
        const data = Template.currentData();
        editor.setContent(data.value);
        window.editor = editor;

        if (data.atts && (data.atts.readOnly || data.atts.readonly)) {
            editor.setMode('readonly');
        } else {
            editor.setMode('');
        }
    });
});

Template.autoformTinyMCE.helpers({
    schemaKey: function() {
        return this.atts['data-schema-key'];
    },
    id: function() {
        return Template.instance().id;
    }
});

Template.autoformTinyMCE.onDestroyed(function() {
    var editor = window.tinymce.get(this.id);
    if (editor) {
        editor.remove();
    }
});

AutoForm.addInputType('tinyMCE', {
    template: "autoformTinyMCE",
    valueOut: function() {
        var id = this.attr('id');
        return window.tinymce.get(id).getContent();
    }
});
