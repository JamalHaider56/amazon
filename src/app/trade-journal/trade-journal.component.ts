import { AuthService } from './../core/auth.service';
import { first, finalize, tap } from 'rxjs/operators';
import { GeneralService } from './../core/genreal.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { CommonSeriveService } from '../core/common-serive.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Tags, Notes, Description, Journal, Pins } from '../models/tradeJournal';
import * as moment from 'moment'
import * as jquery from 'jquery';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
declare var $: any;
interface JQuery {
  select2(): void;
}
@Component({
  selector: 'app-trade-journal',
  templateUrl: './trade-journal.component.html',
  styleUrls: ['./trade-journal.component.scss']
})

export class TradeJournalComponent implements OnInit {
  // < !--------  TradeJournal variable Start ----------------!>
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('scrollMe1') private myScrollContainer1: ElementRef;
  private currentUserId;
  objJournals: any = {};
  public currentUserName: string
  public currentUserInitial: string
  // File Upload Data
  selectedFiles: FileList;
  public imageShowInDialog
  // Main task 
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  // Progress monitoring
  percentage: Observable<number>;

  // For journal
  public journalsForm: FormGroup;
  title: string = '';
  public idToDelete: any;
  journalsdata: Journal[];
  journalid: string = '';
  public getJournalIdForNote;
  public getJournalIdDefaultActive;
  public isDefaultJournalSet = false;
  public journalHeadingForMobile

  // For Notes
  notesdata: Notes[];
  public noteForm: FormGroup;
  public activeNote: Notes = new Notes();

  public getNoteIdForDeleteJournal;

  public getNoteIdDefaultActive;
  public isDefaultDescSet = false;
  // titleSettask: string = '';

  //Note Description
  public descriptionForm: FormGroup;
  descriptiondata: Description[];
  // List of Tags
  lstTags: Tags[];
  today: string;
  objPublisher: any = {};
  public giveDescriptionToUpdateNote;
  // Tradejournal Collection Name
  public journals = "Journals";
  public notes = "Notes";
  public description = "Description";
  public tags = "Tags";
  public journalPin = "JournalPin"
  public _selectedFields: any = {};

  // pinJournal
  public add_to_pin: "Add pin";
  public remove_from_pin: "Remove pin";
  lstPins: Pins[];
  lstPinNotesData: any;
  public pinedJournalIndex;
  public isPinedClick = false;
  public pinedNoteIndexBoolean = false;
  public pinedNoteIndex;
  //  < !--------  TradeJournal variable End ----------------!>

  constructor(private router: Router, private generalService: GeneralService, private formBuilder: FormBuilder,
    private firestore: AngularFirestore, private route: ActivatedRoute, private auth: AuthService, private afAuth: AngularFireAuth
    , private storage: AngularFireStorage) {

    // (<any>jquery(".js-select21")).select2({
    //   allowHtml: true,
    //   tags: true
    // });

    auth.user$.subscribe(user => {
      if (user) {
        this.currentUserInitial = user.initial
      }
    });
    this.objJournals = this.afAuth.auth.currentUser.uid;
    this.currentUserName = this.afAuth.auth.currentUser.displayName;
  }
  home = true;
  blog = false;
  homeMenuShow() {
    this.home = true;
    this.blog = false;
  }
  blogMenuShow(value) {
    if (value == 'home') {
      this.home = true;
      this.blog = false;
    }
    else {
      this.home = false;
      this.blog = true;
    }

  }
  ngAfterViewInit() {

    //  < !--------  TradeJournal Jquery Start ----------------!>
    (<any>jquery(".js-select21")).select2({
      allowHtml: true,
      tags: true
    });

    $(".option_tab .nav a").click(function () {
      var attr = $(this).attr('href');
      if (attr == '#trade_account') {
        $('.trading_opt.trade_opt .watch_drop').hide();
        $('.switch_sec.trading_switch .switch-toggle').hide();
      } else {
        $('.trading_opt.trade_opt .watch_drop').show();
        $('.switch_sec.trading_switch .switch-toggle').show();
      }

    });

    $(".trade_opt select[name='trade_journal_option']").change(function () {
      if ($(this).val() == "trade_account") {
        $('.trading_opt.trade_opt').hide();
        $('.mob_opt_cont').hide();
        $('.mob_switch').hide();
      } else {
        $('.trading_opt.trade_opt').show();
        $('.mob_opt_cont').show();
        $('.mob_switch').show();
      }
    });

    $("select[name='trade_journal_option']").change(function () {
      if ($(this).val() == "trade_journal") {
        $('.mob_journal_sec').show();
        $('.mob_entrie_sec').hide();
        $('.mob_plan_sec').hide();
        $('.mob_account_sec').hide();
      } else if ($(this).val() == "trade_entries") {
        $('.mob_entrie_sec').show();
        $('.mob_journal_sec').hide();
        $('.mob_plan_sec').hide();
        $('.mob_account_sec').hide();

      } else if ($(this).val() == "trade_plans") {
        $('.mob_plan_sec').show();
        $('.mob_journal_sec').hide();
        $('.mob_entrie_sec').hide();
        $('.mob_account_sec').hide();

      } else if ($(this).val() == "trade_account") {
        $('.mob_account_sec').show();
        $('.mob_journal_sec').hide();
        $('.mob_entrie_sec').hide();
        $('.mob_plan_sec').hide();
      }
    });
    // j For back to note in mobile
    $('.note_detail_back_btn1').click(function () {
      $('.note_detail.mob').removeClass('open');
      $('.journal_note_cnt.mob').addClass('open');
    });
    $("#carousel").owlCarousel({
      autoplay: true,
      lazyLoad: true,
      loop: true,
      margin: 20,
      items: 1,
      /*
     animateOut: 'fadeOut',
     animateIn: 'fadeIn',
     */
      responsiveClass: true,
      autoHeight: true,
      autoplayTimeout: 7000,
      smartSpeed: 800,
      nav: false,
      dots: true
    });

    (<any>jquery(".js-select2")).select2({

      allowHtml: true,
      tags: true
    });

    (<any>jquery(".js-select21")).select2({

      allowHtml: true,
      tags: true
    });

    (<any>jquery(".js-example-tokenizer")).select2({
      tags: true,
      tokenSeparators: [',', ' ']
    });

    (<any>jquery(".js-example-tokenizer")).on(
      'change',
      (e) => this._selectedFields = jQuery(e.target).val()
    );

    $('#menu-action').click(function () {
      $('.sidebar').toggleClass('active');
      $(this).toggleClass('active');

    });

    $('#menu-action').hover(function () {
      $('.sidebar').toggleClass('hovered');
    });

    //  < !--------  TradeJournal Jquery End ----------------!>

  }

  ngOnInit(): void {
    //  < !--------  TradeJournal Jquery Start ----------------!>
    (<any>jquery(".js-select21")).select2({

      allowHtml: true,
      tags: true
    });
    $(".option_tab .nav a").click(function () {
      var attr = $(this).attr('href');
      if (attr == '#trade_account') {
        $('.trading_opt.trade_opt .watch_drop').hide();
        $('.switch_sec.trading_switch .switch-toggle').hide();
      } else {
        $('.trading_opt.trade_opt .watch_drop').show();
        $('.switch_sec.trading_switch .switch-toggle').show();
      }

    });

    $(".trade_opt select[name='trade_journal_option']").change(function () {
      if ($(this).val() == "trade_account") {
        $('.trading_opt.trade_opt').hide();
        $('.mob_opt_cont').hide();
        $('.mob_switch').hide();
      } else {
        $('.trading_opt.trade_opt').show();
        $('.mob_opt_cont').show();
        $('.mob_switch').show();
      }
    });

    $("select[name='trade_journal_option']").change(function () {
      if ($(this).val() == "trade_journal") {
        $('.mob_journal_sec').show();
        $('.mob_entrie_sec').hide();
        $('.mob_plan_sec').hide();
        $('.mob_account_sec').hide();
      } else if ($(this).val() == "trade_entries") {
        $('.mob_entrie_sec').show();
        $('.mob_journal_sec').hide();
        $('.mob_plan_sec').hide();
        $('.mob_account_sec').hide();

      } else if ($(this).val() == "trade_plans") {
        $('.mob_plan_sec').show();
        $('.mob_journal_sec').hide();
        $('.mob_entrie_sec').hide();
        $('.mob_account_sec').hide();

      } else if ($(this).val() == "trade_account") {
        $('.mob_account_sec').show();
        $('.mob_journal_sec').hide();
        $('.mob_entrie_sec').hide();
        $('.mob_plan_sec').hide();
      }
    });

    // j For back to note in mobile
    $('.note_detail_back_btn1').click(function () {
      $('.note_detail.mob').removeClass('open');
      $('.journal_note_cnt.mob').addClass('open');
    });

    $('.moveToBackPlan').click(function () {
      $('.journal_note_cnt.mob').removeClass('open');
      $('.note_detail.mob').addClass('close');
      $('.mob .journal_fold').removeClass('close');
    });

    $("#carousel").owlCarousel({
      autoplay: true,
      lazyLoad: true,
      loop: true,
      margin: 20,
      items: 1,
      /*
     animateOut: 'fadeOut',
     animateIn: 'fadeIn',
     */
      responsiveClass: true,
      autoHeight: true,
      autoplayTimeout: 7000,
      smartSpeed: 800,
      nav: false,
      dots: true
    });

    //  < !--------  TradeJournal Jquery End ----------------!>

    //  < !--------  TradeJournal Form Start ----------------!>
    // this.scrollToBottom();
    this.today = new Date().toISOString().split('T')[0];
    this.objPublisher = this.today
    this.getJournalList();
    this.getTags();
    //  this.getNotes();
    // this.getPin();
    this.journalsForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'id': [null],
      'createdAt': [null]
    });

    this.noteForm = this.formBuilder.group({
      'id': [null],
      'journalId': [null],
      'noteTitle': [null],
      'createdAt': [null],
      'tags': [null],
      'pinTag': [false]
    });

    this.descriptionForm = this.formBuilder.group({
      'noteId': [null],
      'description': [null],
      'createdAt': [null]
    });

    this.getJournals(this.journalid);
    setTimeout(() => {
      this.getNotesForPin();
    }, 1000);

    //  < !--------  TradeJournal Form End ----------------!>
    // this.getDescriptionData()
  }
  //   ngAfterViewChecked() {        
  //     this.scrollToBottom();        
  // } 


  ngAfterViewChecked() {
    //  < !--------  TradeJournal Jquery Start ----------------!>
    $(".option_tab .nav a").click(function () {
      var attr = $(this).attr('href');
      if (attr == '#trade_account') {
        $('.trading_opt.trade_opt .watch_drop').hide();
        $('.switch_sec.trading_switch .switch-toggle').hide();
      } else {
        $('.trading_opt.trade_opt .watch_drop').show();
        $('.switch_sec.trading_switch .switch-toggle').show();
      }

    });

    $(".trade_opt select[name='trade_journal_option']").change(function () {
      if ($(this).val() == "trade_account") {
        $('.trading_opt.trade_opt').hide();
        $('.mob_opt_cont').hide();
        $('.mob_switch').hide();
      } else {
        $('.trading_opt.trade_opt').show();
        $('.mob_opt_cont').show();
        $('.mob_switch').show();
      }
    });

    $("select[name='trade_journal_option']").change(function () {
      if ($(this).val() == "trade_journal") {
        $('.mob_journal_sec').show();
        $('.mob_entrie_sec').hide();
        $('.mob_plan_sec').hide();
        $('.mob_account_sec').hide();
      } else if ($(this).val() == "trade_entries") {
        $('.mob_entrie_sec').show();
        $('.mob_journal_sec').hide();
        $('.mob_plan_sec').hide();
        $('.mob_account_sec').hide();

      } else if ($(this).val() == "trade_plans") {
        $('.mob_plan_sec').show();
        $('.mob_journal_sec').hide();
        $('.mob_entrie_sec').hide();
        $('.mob_account_sec').hide();

      } else if ($(this).val() == "trade_account") {
        $('.mob_account_sec').show();
        $('.mob_journal_sec').hide();
        $('.mob_entrie_sec').hide();
        $('.mob_plan_sec').hide();
      }
    });
    // this.scrollToBottom(); 
    $("#carousel").owlCarousel({
      autoplay: true,
      lazyLoad: true,
      loop: true,
      margin: 20,
      items: 1,
      /*
     animateOut: 'fadeOut',
     animateIn: 'fadeIn',
     */
      responsiveClass: true,
      autoHeight: true,
      autoplayTimeout: 7000,
      smartSpeed: 800,
      nav: false,
      dots: true
    });
    //switch tab
    //mob jouranal note

    $('.mob .journal_fold li a').click(function () {

      $('.journal_note_cnt.mob').addClass('open');
      $('.mob .journal_fold').addClass('close');
      $('.note_detail.mob').removeClass('open');
      $('.note_detail.mob').removeClass('close');

    });

    $('.mob .journal_fold li a').click(function () {

      $('.journal_note_cnt.mob').addClass('open');
      $('.mob .journal_fold').addClass('close');
      $('.note_detail.mob').removeClass('open');
      $('.note_detail.mob').removeClass('close');

    });

    $('.journal_note_cnt.mob .note_list .note_cont').click(function () {

      $('.note_detail.mob').addClass('open');
      $('.journal_note_cnt.mob').removeClass('open');
    });


    $('.note_detail_back_btn').click(function () {
      $('.note_detail.mob').removeClass('open');
      $('.journal_note_cnt.mob').addClass('open');


    });
    $('.note_back_btn').click(function () {

      $('.journal_note_cnt.mob').removeClass('open');
      $('.note_detail.mob').addClass('close');
      $('.mob .journal_fold').removeClass('close');


    });

    //  < !--------  TradeJournal Jquery End ----------------!>
  }

  // < !---------------------------------  TradeJournal Function Start ----------------------------------------------!>
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  onChange(deviceValue) {
    console.log(deviceValue);
  }

  // TradeJournal Functions
  onFormSubmitJournal(form: NgForm) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    this.journalsForm.controls.createdAt.setValue(timestamp);
    this.objJournals = this.journalsForm.value;
    var id = this.objJournals.id;

    delete this.objJournals.id;
    if (id) {
      this.generalService.updateData(id, this.objJournals, this.journals)
        .subscribe(res => {
          this.isDefaultJournalSet = false;
          this.getJournalList();
          this.router.navigate(['/tradeJournal']);
        }, (err) => {
          console.log(err);
        }
        );
    }
    else {
      // apForm = ob
      this.generalService.collectionName = "Journals";
      this.generalService.postData(this.objJournals, this.journals)
        .subscribe(res => {
          debugger
          let id = res['key'];
          this.isDefaultJournalSet = false;
          this.getJournalList();
          this.router.navigate(['/tradeJournal']);
        }, (err) => {
          console.log(err);
        });
    }
  }

  getJournalList() {
    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Journals/`, query => query.orderBy('createdAt', 'desc'))
      .snapshotChanges().subscribe(actionArray => {
        this.journalsdata = actionArray.map((item: any) => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Journal;
        });
        if (this.isDefaultJournalSet == false) {
          this.getJournals(this.journalsdata[0]);
          this.isDefaultJournalSet = true
        }
      });
  }

  setJournalData(journal) {
    this.journalsForm.setValue({
      id: journal.id,
      title: journal.title,
      createdAt: journal.createdAt
    });
  }

  // deleteDescription(descId){
  //   this.generalService.deleteData(descId.id, this.description)
  //   .subscribe(res => {
  //     this.router.navigate(['/tradeJournal']);
  //   }, (err) => {
  //     console.log(err);
  //   }
  //   );
  // }
  deleteJournal(id) {
    this.generalService.deleteData(id, this.journals)
      .subscribe(res => {

        this.deleteDescriptionsByNoteJournalId();
        this.journalHeadingForMobile = "";
        this.router.navigate(['/tradeJournal']);
      }, (err) => {
        console.log(err);
      }
      );
  }

  deleteNoteByJournalId() {
    firebase.firestore().collection('tradingjournal').doc(this.afAuth.auth.currentUser.uid)
      .collection(this.notes).where('journalId', '==', this.getJournalIdForNote ? this.getJournalIdForNote : null)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            this.isDefaultJournalSet = false;
            this.getJournalList();
            this.getNotes(this.activeNote.id);
          }).catch(function (error) {
            console.error("Error removing document: ", error);
          });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }


  deleteDescriptionsByNoteJournalId() {
    // console.log(this.notesdata);

    this.notesdata.forEach(childObj => {

      firebase.firestore().collection('tradingjournal').doc(this.afAuth.auth.currentUser.uid)
        .collection(this.description).where('noteId', '==', childObj.id ? childObj.id : null)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete().then(() => {
              this.deleteNoteByJournalId();
              this.activeNote = new Notes();
              // this.deleteNoteById();
            }).catch(function (error) {
              console.error("Error removing document: ", error);
            });
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    });

    // 07March2020 empty plan add and delete than it does not set 0default active start
    if (this.notesdata.length < 1) {
      this.isDefaultJournalSet = false;
      this.getJournalList();
      this.getNotes(this.activeNote.id);
    }
    // 07March2020 empty plan add and delete than it does not set 0default active end
  }
  // deleteJournal(id) {
  //   this.generalService.deleteData(id, this.journals)
  //     .subscribe(res => {
  //       this.deleteNoteById();
  //       this.router.navigate(['/tradeJournal']);
  //     }, (err) => {
  //       console.log(err);
  //     }
  //     );
  // }

  setJournalIdToDelte(itemId) {
    this.idToDelete = "";
    this.idToDelete = itemId;
  }

  getJournals(getJournal) {
    this.noteForm.controls.journalId.setValue(getJournal.id);
    this.getJournalIdForNote = getJournal.id
    this.getNotes(getJournal.id);
    // 16march uncomment start
    this.activeNote = new Notes();
    this.descriptiondata = [];
    // 16march uncomment end

    this.journalHeadingForMobile = getJournal.title;
    this.pinedNoteIndexBoolean = false;

  }

  getJournalsForPin(getNotePin) {
    this.noteForm.controls.journalId.setValue(getNotePin.journalId);
    this.getJournalIdForNote = getNotePin.journalId;
    this.getNotesForPinListSelect(getNotePin.journalId, getNotePin.id);

    this.setDescriptionHeader(getNotePin);


  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  parsedData = [];
  // Notes Functions
  onNoteFormSubmit(form: NgForm) {
    // const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    // this.noteForm.controls.createdAt.setValue(timestamp);

    // for Binance api start
    //     this.generalService.binanceData().subscribe((data: string) => {
    //       const atobString = atob(data);
    //       const decodedString = this.encryptXor(atobString);
    //       this.parsedData = JSON.parse(decodedString);
    //       console.log("jamal succfullAppl")
    // console.log(this.parsedData);
    //      }, (err) => {
    //       console.log(err);
    //     }
    //     );  
    // for Binance api end

    this.noteForm.controls.tags.setValue(this._selectedFields);

    var apNoteForm = this.noteForm.value;

    var id = apNoteForm.id;
    delete apNoteForm.id;
    if (id) {
      if (this.giveDescriptionToUpdateNote) {
        apNoteForm.description = this.giveDescriptionToUpdateNote;
      }
      this.generalService.updateData(id, apNoteForm, this.notes)
        .subscribe(res => {
          // this.activeNote = apNoteForm;
          $("#dropdown").val("");
          (<any>jquery("#dropdown")).select2().trigger('change');
          //this.getJournalList();
          this.noteForm.controls.noteTitle.setValue("");
          this.noteForm.controls.tags.setValue("");
          this.noteForm.controls.id.setValue("");
        }, (err) => {
          console.log(err);
        }
        );
    }
    else {
      apNoteForm.pinTag = false;
      apNoteForm.createdAt = null;
      this.generalService.postData(apNoteForm, this.notes)

        .subscribe(res => {
          debugger
          let id = res['key'];
          $("#dropdown").val("");
          (<any>jquery("#dropdown")).select2().trigger('change');
          this.noteForm.controls.noteTitle.setValue("");
          this.noteForm.controls.tags.setValue("");
          // $("#myModal").modal("hide");
          this.router.navigate(['/tradeJournal']);
        }, (err) => {
          console.log(err);
        });
    }
  }

  setPinValue(note) {
    note.pinTag = !note.pinTag;
    this.generalService.updateData(note.id, note, this.notes)
      .subscribe(res => {
      }, (err) => {
        console.log(err);
      }
      );

  }

  setNoteValue(note) {
    this.noteForm.patchValue(note);
    this.giveDescriptionToUpdateNote = note.description;
    $("#dropdown").val(note.tags);
    (<any>jquery("#dropdown")).select2().trigger('change');
    // Select first dropdown value
    // (<any>jquery(".js-example-tokenizer")).select2("val", note.tags );
  }

  getNotes(noteId) {
    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Notes`, query => query.orderBy('createdAt', 'desc').where('journalId', '==', noteId ? noteId : null)).snapshotChanges().subscribe(actionArray => {
      this.notesdata = actionArray.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Notes
      })
      if (this.notesdata.length) {
        this.setDescriptionHeader(this.notesdata[0]);
        this.isDefaultDescSet = true;
      }
    });
  }

  getNotesForPinListSelect(noteId, noteIdForPin?) {

    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Notes`, query => query.orderBy('createdAt', 'desc').where('journalId', '==', noteId ? noteId : null)).snapshotChanges().subscribe(actionArray => {
      this.notesdata = actionArray.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Notes
      })
      this.pinedJournalIndex = this.journalsdata.findIndex(x => x.id == noteId);

      this.isPinedClick = true;

      this.pinedNoteIndex = this.notesdata.findIndex(x => x.id == noteIdForPin);
      this.pinedNoteIndexBoolean = true;
    });

  }
  getNotesForPin() {
    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Notes`, query => query.orderBy('createdAt', 'desc'))
      .snapshotChanges().subscribe(actionArray => {
        this.lstPinNotesData = actionArray.map((item: any) => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        })
      });
  }

  deleteNoteById() {
    this.generalService.deleteData(this.activeNote.id, this.notes)
      .subscribe(res => {
        if (this.notesdata.length < 1) {
          this.activeNote = new Notes();
        }
        // this.deleteDescriptionsByNoteId();
        // this.activeNote = new Notes();

      }, (err) => {
        console.log(err);
      }
      );
  }

  setLatestNoteDescription(noteData) {
    noteData.description = this.descriptionForm.value.description;
    noteData.createdAt = this.descriptionForm.value.createdAt;

    this.generalService.updateData(noteData.id, noteData, this.notes)
      .subscribe(res => {

      }, (err) => {
        console.log(err);
      }
      );
  }
  // Description Functions against notes
  onFormSubmitDescription(form: NgForm) {
    if (this.selectedFiles) {
      this.startUpload(this.selectedFiles);
      this.selectedFiles = null;
    }

    if (this.descriptionForm.controls.description.value != null && this.descriptionForm.controls.description.value != "") {

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      this.descriptionForm.controls.createdAt.setValue(timestamp);
      var appDescriptionForm = this.descriptionForm.value;

      this.setLatestNoteDescription(this.activeNote);

      this.generalService.postData(appDescriptionForm, this.description)
        .subscribe(res => {
          debugger
          let id = res['key'];
          this.descriptionForm.controls.description.setValue("");
        }, (err) => {
          console.log(err);
        });
    }

  }


  // setDescriptionHeaderForActiveDefault(note) {
  //   this.activeNote = note;
  //   this.descriptionForm.controls.noteId.setValue(this.activeNote.id);
  //    this.getDescriptionData();
  // }
  setDescriptionHeader(note) {
    this.activeNote = note;
    this.descriptionForm.controls.noteId.setValue(this.activeNote.id);
    this.getDescriptionData();
  }

  // getDescriptionDataForActive(NoteIdDefaultActive) {
  //   this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Description`, query => query.orderBy('createdAt','asc').where('noteId', '==', NoteIdDefaultActive)).snapshotChanges().subscribe(actionArray => {
  //     this.descriptiondata = actionArray.map((item: any) => {
  //       return {
  //         id: item.payload.doc.id,
  //         ...item.payload.doc.data()
  //       } as Description
  //     })
  //    this.descriptiondata.forEach(element => {
  //      if(element.path)
  //      this.getImageUrl(element.path).subscribe(url=>{
  //       element.imageUrl = url;
  //      })
  //    });
  //   });

  // }

  getDescriptionData() {
    this.firestore.collection(`tradingjournal/${this.afAuth.auth.currentUser.uid}/Description`, query => query.orderBy('createdAt', 'asc').where('noteId', '==', this.activeNote.id ? this.activeNote.id : null)).snapshotChanges().subscribe(actionArray => {
      this.descriptiondata = actionArray.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Description
      })
      this.descriptiondata.forEach(element => {
        if (element.path)
          this.getImageUrl(element.path).subscribe(url => {
            element.imageUrl = url;
          })
      });
    });

  }

  deleteDescriptionsByNoteId() {
    firebase.firestore().collection('tradingjournal').doc(this.afAuth.auth.currentUser.uid)
      .collection(this.description).where('noteId', '==', this.activeNote.id ? this.activeNote.id : null)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            doc.ref.delete().then(() => {
              this.deleteNoteById();
              // this.deleteNoteById();
            }).catch(function (error) {
              console.error("Error removing document: ", error);
            });
          });
        }
        else {
          this.deleteNoteById();
        }

      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  //  List of Tag namesF
  getTags() {
    this.firestore.collection('/Tags').snapshotChanges().subscribe(actionArray => {
      this.lstTags = actionArray.map((item: any) => {
        return {

          ...item.payload.doc.data()
        } as Tags
      })
    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  public uploadedImageSuccessfully
  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type')
      return;
    }

    // The storage path
    const path = `tradeJournalImages/${new Date().getTime()}_${file.name}`;
    var timestampForImage = firebase.firestore.FieldValue.serverTimestamp();
    var imageActiveNoteId = this.activeNote.id

    // The main task
    this.task = this.storage.upload(path, file)
    var ref = this.storage.ref(path);
    // Progress monitoring
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.uploadedImageSuccessfully = "Uploading Image";
    this.snapshot = this.task.snapshotChanges();
    // don't need this ^, but I still kept it
    this.task.snapshotChanges().subscribe(snap => {
      if (snap.bytesTransferred === snap.totalBytes) {
        // Update firestore on completion
        this.firestore.collection('tradingjournal').doc(this.afAuth.auth.currentUser.uid).collection('Description').add({ createdAt: timestampForImage, noteId: imageActiveNoteId, path, size: snap.totalBytes })
      }
    });
    // Ye pahly wala tha 03March2020
    // this.snapshot   = this.task.snapshotChanges().pipe(
    //   tap(snap => {
    //     // console.log(snap)
    //     if (snap.bytesTransferred === snap.totalBytes) {
    //       // Update firestore on completion
    //       this.firestore.collection('tradingjournal').doc(this.afAuth.auth.currentUser.uid).collection('Description').add( { createdAt:timestampForImage, noteId:imageActiveNoteId, path, size: snap.totalBytes })
    //     }
    //   })
    // )
  }

  public getImageUrl(path): Observable<any> {

    var ref = this.storage.ref(path);
    setTimeout(() => {
      this.uploadedImageSuccessfully = "Uploading Image";
      setTimeout(() => {
        this.percentage = null
        this.uploadedImageSuccessfully = "";
      }, 1000);
    }, 1000);

    return ref.getDownloadURL();


  }

  getImageUrlForShowInDialog(imgUrl) {
    this.imageShowInDialog = imgUrl;

  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  logOut() {
    this.auth.signOut();
  }
  //   public dropCont :string ="";
  //   public actionBox2 :string ="";
  //  public ToggleClass(){
  //   this.actionBox2 = this.actionBox2 ? "" : "open";
  //    this.dropCont= this.dropCont ? "" : "open";
  //   }


  // < !---------------------------------  TradeJournal Function End ----------------------------------------------!>
}





