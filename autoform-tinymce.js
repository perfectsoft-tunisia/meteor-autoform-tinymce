Template.autoformTinyMCE.onCreated(function() {
    this.id = this.data.atts ? (this.data.atts.id || Math.random().toString(36).substring(7)) : Math.random().toString(36).substring(7);
});

Template.autoformTinyMCE.onRendered(function() {
    let options = this.data.atts.tinyMCEOptions || {};
    options.selector = '#' + this.id;

    tinymce.init(options);


    var editor = tinymce.get(this.id);

    editor.once('init', () => {
        if (this.data.value) {
            editor.setContent(this.data.value);
        }
    });

    
    this.autorun(() => {
        const data = Template.currentData();
        editor.setContent(data.value);
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
    tinymce.get(this.id)
    if (editor) {
        editor.destroy();
    }
});

AutoForm.addInputType('tinyMCE', {
    template: "autoformTinyMCE",
    valueOut: function() {
        var id = this.attr('id');
        return tinymce.get(id).getContent();
    }
});
