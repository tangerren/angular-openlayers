import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Map, interaction, layer, source, style, Feature, format } from 'openlayers';

@Component({
    selector: 'draw-tool',
    templateUrl: './draw-tool.component.html',
    styleUrls: ['./draw-tool.component.css']
})
export class DrawToolComponent implements OnInit {

    @Input() map: Map;
    constructor(protected elementRef: ElementRef) { }

    typeSelect: any;
    source = new source.Vector();
    vector = new layer.Vector({
        source: this.source,
        style: new style.Style({
            fill: new style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new style.Circle({
                radius: 7,
                fill: new style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });

    draw: interaction.Draw;
    snap = new interaction.Snap({ source: this.source });
    modify = new interaction.Modify({ source: this.source });

    ngOnInit(): void {
        this.map.addLayer(this.vector);
        this.map.addInteraction(this.modify);

        this.typeSelect = this.elementRef.nativeElement.querySelector('#drawType');
        this.typeSelect.onchange = () => {
            this.map.removeInteraction(this.draw);
            this.map.removeInteraction(this.snap);
            this.addInteractions();
        };
        this.addInteractions();
    }

    addInteractions() {
        this.draw = new interaction.Draw({
            source: this.source,
            type: this.typeSelect.value
        });
        this.map.addInteraction(this.draw);
        this.map.addInteraction(this.snap);
    }
}
