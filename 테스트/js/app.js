// Minnamitna (민나믿나) Main Application Logic & Controller
// Strictly Vanilla JS, LocalStorage persistence, Full PRD Flow

(function () {
  'use strict';

  // 1. Initial State & Persistence Keys
  const STORAGE_KEYS = {
    ONBOARDED: 'minnamitna_onboarded',
    KEYWORDS: 'minnamitna_user_keywords',
    SAVED_EVENTS: 'minnamitna_saved_events',
    PILGRIMAGE_STATUS: 'minnamitna_pilgrimage_status',
    BUDGET_DATA: 'minnamitna_budget_data',
    COMMUNITY_POSTS: 'minnamitna_community_posts',
    LAB_RECORDS: 'minnamitna_lab_records'
  };

  const state = {
    currentTab: 'screen-home',
    selectedEventForDetail: null,
    selectedPilgrimageEventId: 'evt-1',
    userKeywords: JSON.parse(localStorage.getItem(STORAGE_KEYS.KEYWORDS)) || ['애니메이션', '버튜버', '굿즈', '일러스트'],
    savedEventIds: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_EVENTS)) || ['evt-1', 'evt-2']),
    visitedBooths: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.PILGRIMAGE_STATUS)) || []),
    budget: JSON.parse(localStorage.getItem(STORAGE_KEYS.BUDGET_DATA)) || window.MinnamitnaData.defaultBudget,
    communityPosts: JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMUNITY_POSTS)) || window.MinnamitnaData.communityPosts,
    themeLabRecords: JSON.parse(localStorage.getItem(STORAGE_KEYS.LAB_RECORDS)) || window.MinnamitnaData.defaultThemeLabs,
    postFilter: 'all',
    exploreFilter: {
      search: '',
      category: 'all',
      region: 'all',
      status: 'all',
      sort: 'recommended'
    }
  };

  // 2. DOM Selectors
  const DOM = {
    appMain: document.getElementById('app-main'),
    bottomNav: document.getElementById('bottom-nav'),
    navItems: document.querySelectorAll('.bottom-nav__item'),
    screenViews: document.querySelectorAll('.screen-view'),
    brandLogo: document.getElementById('brand-logo'),
    
    // Home
    homeKeywords: document.getElementById('home-keyword-chips'),
    homeRecommended: document.getElementById('home-recommended-events'),
    homeSaved: document.getElementById('home-saved-events'),
    homeVtuber: document.getElementById('home-vtuber-events'),
    homeSubculture: document.getElementById('home-subculture-events'),
    btnManageKeywords: document.getElementById('btn-manage-keywords'),

    // Explore
    exploreSearchInput: document.getElementById('explore-search-input'),
    btnClearSearch: document.getElementById('btn-clear-search'),
    exploreCategoryChips: document.getElementById('explore-category-chips'),
    exploreResults: document.getElementById('explore-results-list'),
    filterRegion: document.getElementById('filter-region'),
    filterStatus: document.getElementById('filter-status'),
    filterSort: document.getElementById('filter-sort'),

    // Detail View
    viewDetail: document.getElementById('view-event-detail'),
    btnCloseDetail: document.getElementById('btn-close-detail'),
    detailImg: document.getElementById('detail-img'),
    detailTitle: document.getElementById('detail-title'),
    detailVerification: document.getElementById('detail-verification'),
    detailOrganizer: document.getElementById('detail-organizer'),
    detailDate: document.getElementById('detail-date'),
    detailLocation: document.getElementById('detail-location'),
    detailLink: document.getElementById('detail-link'),
    detailDesc: document.getElementById('detail-desc'),
    detailBoothsList: document.getElementById('detail-booths-list'),
    detailBoothCount: document.getElementById('detail-booth-count'),
    btnDetailSave: document.getElementById('btn-detail-save'),
    detailSaveText: document.getElementById('detail-save-text'),
    btnDetailAddPilgrimage: document.getElementById('btn-detail-add-pilgrimage'),
    btnDetailShare: document.getElementById('btn-detail-share'),

    // Pilgrimage
    pilgrimageEventSelect: document.getElementById('pilgrimage-event-select'),
    btnGenerateRoute: document.getElementById('btn-generate-route'),
    pilgrimageBoothList: document.getElementById('pilgrimage-booth-list'),

    // KamiOshi & Off-record
    tabBtnKamioshi: document.getElementById('tab-btn-kamioshi'),
    tabBtnOffrecord: document.getElementById('tab-btn-offrecord'),
    kamioshiContainer: document.getElementById('kamioshi-view-container'),
    offrecordContainer: document.getElementById('offrecord-view-container'),
    kamioshiPostsList: document.getElementById('kamioshi-posts-list'),
    offrecordQAList: document.getElementById('offrecord-qa-list'),
    btnOpenCreatePost: document.getElementById('btn-open-create-post'),
    btnAskQuestion: document.getElementById('btn-ask-question'),

    // My Page
    mySavedCount: document.getElementById('my-saved-count'),
    mySavedList: document.getElementById('my-saved-events-list'),
    btnOpenCountCash: document.getElementById('btn-open-countcash'),
    btnOpenThemeLabs: document.getElementById('btn-open-themelabs'),
    btnManageGuardian: document.getElementById('btn-manage-guardian'),
    btnResetPrototype: document.getElementById('btn-reset-prototype'),

    // Modals & BottomSheets
    viewOnboarding: document.getElementById('view-onboarding'),
    sheetCountCash: document.getElementById('sheet-countcash'),
    btnCloseCountCash: document.getElementById('btn-close-countcash'),
    sheetThemeLabs: document.getElementById('sheet-themelabs'),
    btnCloseThemeLabs: document.getElementById('btn-close-themelabs'),
    modalGuardian: document.getElementById('modal-guardian'),
    btnCancelReport: document.getElementById('btn-cancel-report'),
    btnConfirmReport: document.getElementById('btn-confirm-report'),
    toastContainer: document.getElementById('toast-container'),

    // Count Cash elements
    countcashEventName: document.getElementById('countcash-event-name'),
    budgetTotalVal: document.getElementById('budget-total-val'),
    budgetRemainVal: document.getElementById('budget-remain-val'),
    inputBudgetTicket: document.getElementById('input-budget-ticket'),
    inputBudgetTransport: document.getElementById('input-budget-transport'),
    inputBudgetFood: document.getElementById('input-budget-food'),
    budgetGoodsList: document.getElementById('budget-goods-list'),
    inputNewGoodName: document.getElementById('input-new-good-name'),
    inputNewGoodPrice: document.getElementById('input-new-good-price'),
    btnAddGoods: document.getElementById('btn-add-goods'),
    btnSaveBudget: document.getElementById('btn-save-budget'),

    // Theme Labs elements
    inputLabTitle: document.getElementById('input-lab-title'),
    inputLabReview: document.getElementById('input-lab-review'),
    inputLabAmount: document.getElementById('input-lab-amount'),
    btnSubmitLabLog: document.getElementById('btn-submit-lab-log'),
    themelabsRecordsContainer: document.getElementById('themelabs-records-container')
  };

  // 3. Helper Utilities
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2400);
  }

  function formatCurrency(val) {
    return Number(val || 0).toLocaleString('ko-KR') + '원';
  }

  function getVerificationBadgeHtml(status) {
    const map = {
      official: { text: '공식 확인', class: 'status-badge--official' },
      sourced: { text: '출처 있음', class: 'status-badge--sourced' },
      user: { text: '사용자 제보', class: 'status-badge--user' },
      pending: { text: '확인 필요', class: 'status-badge--pending' }
    };
    const item = map[status] || map.pending;
    return `<span class="status-badge ${item.class}">✓ ${item.text}</span>`;
  }

  function getStockBadgeHtml(status) {
    const map = {
      enough: { text: '재고 충분', class: 'stock-badge--enough' },
      normal: { text: '재고 보통', class: 'stock-badge--normal' },
      low: { text: '품절 임박', class: 'stock-badge--low' },
      soldout: { text: '품절', class: 'stock-badge--soldout' },
      unknown: { text: '확인 필요', class: 'stock-badge--unknown' }
    };
    const item = map[status] || map.unknown;
    return `<span class="stock-badge ${item.class}">${item.text}</span>`;
  }

  // 4. Navigation & View Routing
  function switchTab(targetId) {
    state.currentTab = targetId;
    DOM.screenViews.forEach(view => {
      if (view.id === targetId) {
        view.classList.add('is-active');
      } else {
        view.classList.remove('is-active');
      }
    });

    DOM.navItems.forEach(item => {
      if (item.getAttribute('data-target') === targetId) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });

    DOM.viewDetail.classList.remove('is-active');
    DOM.appMain.scrollTop = 0;

    // Trigger tab specific refresh
    if (targetId === 'screen-explore') renderExplore();
    if (targetId === 'screen-pilgrimage') renderPilgrimage();
    if (targetId === 'screen-kamioshi') renderCommunity();
    if (targetId === 'screen-my') renderMyPage();
  }

  // 5. Render Components: Cards
  function createEventCard(event) {
    const isSaved = state.savedEventIds.has(event.id);
    const card = document.createElement('article');
    card.className = 'event-card';
    card.innerHTML = `
      <div class="event-card__cover-wrapper">
        <img class="event-card__img" src="${event.thumbnail}" alt="${event.title}" loading="lazy">
        <button class="event-card__save-btn ${isSaved ? 'is-saved' : ''}" data-event-id="${event.id}" title="행사 저장">
          ${isSaved ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="event-card__content">
        <div class="event-card__header">
          ${getVerificationBadgeHtml(event.verificationStatus)}
          <span style="font-size: 11px; color: var(--gray-500);">${event.organizer}</span>
        </div>
        <h3 class="event-card__title">${event.title}</h3>
        <div class="event-card__meta">
          <span>📅 ${event.startDate} ~ ${event.endDate}</span>
          <span>📍 ${event.location}</span>
        </div>
        <div class="event-card__keywords">
          ${event.keywords.map(kw => `<span class="keyword-chip">${kw}</span>`).join('')}
        </div>
      </div>
    `;

    // Click to view detail
    card.addEventListener('click', (e) => {
      if (e.target.closest('.event-card__save-btn')) return;
      openEventDetail(event.id);
    });

    // Save toggle
    const saveBtn = card.querySelector('.event-card__save-btn');
    saveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSaveEvent(event.id);
    });

    return card;
  }

  function toggleSaveEvent(eventId) {
    if (state.savedEventIds.has(eventId)) {
      state.savedEventIds.delete(eventId);
      showToast('저장 목록에서 제거되었습니다.');
    } else {
      state.savedEventIds.add(eventId);
      showToast('행사가 내 저장 목록에 추가되었습니다!');
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_EVENTS, JSON.stringify([...state.savedEventIds]));
    
    // Refresh relevant views
    renderHome();
    if (state.currentTab === 'screen-explore') renderExplore();
    if (state.currentTab === 'screen-my') renderMyPage();
    if (state.selectedEventForDetail === eventId) updateDetailSaveBtn(eventId);
  }

  // 6. Home View Rendering
  function renderHome() {
    // Keywords
    DOM.homeKeywords.innerHTML = state.userKeywords.map(kw => `
      <button class="filter-chip is-active" data-keyword="${kw}">${kw}</button>
    `).join('');

    // Attach click to keyword chips in home
    DOM.homeKeywords.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const kw = btn.getAttribute('data-keyword');
        DOM.exploreSearchInput.value = kw;
        state.exploreFilter.search = kw;
        switchTab('screen-explore');
      });
    });

    // Recommended Events
    DOM.homeRecommended.innerHTML = '';
    const mainEvents = window.MinnamitnaData.events.filter(e => e.category === 'event');
    mainEvents.forEach(evt => {
      DOM.homeRecommended.appendChild(createEventCard(evt));
    });

    // Saved events summary
    DOM.homeSaved.innerHTML = '';
    const savedList = window.MinnamitnaData.events.filter(e => state.savedEventIds.has(e.id));
    if (savedList.length === 0) {
      DOM.homeSaved.innerHTML = `
        <div class="empty-state" style="padding: 20px;">
          <p class="empty-state__desc" style="font-size: 12px;">아직 저장한 행사가 없습니다. 관심 있는 행사를 찜해보세요!</p>
        </div>
      `;
    } else {
      const savedContainer = document.createElement('div');
      savedContainer.style.display = 'flex';
      savedContainer.style.gap = '8px';
      savedContainer.style.overflowX = 'auto';
      savedContainer.style.paddingBottom = '8px';
      savedList.forEach(e => {
        const miniCard = document.createElement('div');
        miniCard.style.cssText = 'min-width: 140px; border: 1px solid var(--gray-200); border-radius: 8px; padding: 8px; cursor: pointer; background: white;';
        miniCard.innerHTML = `
          <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${e.title}</div>
          <div style="font-size: 11px; color: var(--gray-500);">${e.startDate}</div>
        `;
        miniCard.addEventListener('click', () => openEventDetail(e.id));
        savedContainer.appendChild(miniCard);
      });
      DOM.homeSaved.appendChild(savedContainer);
    }

    // VTuber & Collab
    DOM.homeVtuber.innerHTML = '';
    const vtuberEvents = window.MinnamitnaData.events.filter(e => e.category === 'collab' || e.keywords.includes('버튜버'));
    vtuberEvents.forEach(evt => DOM.homeVtuber.appendChild(createEventCard(evt)));

    // Subculture Movie & Figures
    DOM.homeSubculture.innerHTML = '';
    const subEvents = window.MinnamitnaData.events.filter(e => e.category === 'anime' || e.category === 'figure');
    subEvents.forEach(evt => DOM.homeSubculture.appendChild(createEventCard(evt)));
  }

  // 7. Explore View Rendering & Filtering
  function renderExplore() {
    // Render Category Filter Chips if empty
    if (!DOM.exploreCategoryChips.children.length) {
      DOM.exploreCategoryChips.innerHTML = window.MinnamitnaData.categories.map(c => `
        <button class="filter-chip ${c.id === state.exploreFilter.category ? 'is-active' : ''}" data-cat="${c.id}">
          ${c.name}
        </button>
      `).join('');

      DOM.exploreCategoryChips.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          DOM.exploreCategoryChips.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          state.exploreFilter.category = btn.getAttribute('data-cat');
          renderExplore();
        });
      });
    }

    // Filter Logic
    let filtered = window.MinnamitnaData.events.filter(item => {
      // Category
      if (state.exploreFilter.category !== 'all' && item.category !== state.exploreFilter.category) {
        return false;
      }
      // Search
      if (state.exploreFilter.search) {
        const query = state.exploreFilter.search.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchLocation = item.location.toLowerCase().includes(query);
        const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(query));
        const matchBooths = item.booths && item.booths.some(b => b.name.toLowerCase().includes(query));
        if (!matchTitle && !matchLocation && !matchKeywords && !matchBooths) return false;
      }
      // Region
      if (state.exploreFilter.region !== 'all') {
        const reg = state.exploreFilter.region.toLowerCase();
        if (reg === 'kintex' && !item.location.includes('KINTEX')) return false;
        if (reg === 'setec' && !item.location.includes('SETEC')) return false;
        if (reg === 'coex' && !item.location.includes('COEX')) return false;
        if (reg === 'hongdae' && !item.location.includes('홍대')) return false;
      }
      return true;
    });

    // Render results
    DOM.exploreResults.innerHTML = '';
    if (filtered.length === 0) {
      DOM.exploreResults.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🔍</div>
          <h4 class="empty-state__title">검색 결과가 없습니다</h4>
          <p class="empty-state__desc">다른 검색어를 입력하시거나 필터 조건을 변경해보세요.</p>
        </div>
      `;
    } else {
      filtered.forEach(evt => {
        DOM.exploreResults.appendChild(createEventCard(evt));
      });
    }
  }

  // 8. Event Detail View
  function openEventDetail(eventId) {
    const event = window.MinnamitnaData.events.find(e => e.id === eventId);
    if (!event) return;

    state.selectedEventForDetail = eventId;
    DOM.detailImg.src = event.thumbnail;
    DOM.detailTitle.textContent = event.title;
    DOM.detailVerification.outerHTML = getVerificationBadgeHtml(event.verificationStatus);
    DOM.detailVerification = DOM.viewDetail.querySelector('.status-badge');
    DOM.detailOrganizer.textContent = '주최: ' + event.organizer;
    DOM.detailDate.textContent = `${event.startDate} ~ ${event.endDate}`;
    DOM.detailLocation.textContent = event.location;
    DOM.detailLink.href = event.officialUrl;
    DOM.detailDesc.textContent = event.description;

    updateDetailSaveBtn(eventId);

    // Render booths
    DOM.detailBoothsList.innerHTML = '';
    if (!event.booths || event.booths.length === 0) {
      DOM.detailBoothCount.textContent = '부스 정보 업데이트 예정';
      DOM.detailBoothsList.innerHTML = `
        <div style="font-size: 13px; color: var(--gray-500); padding: 12px 0;">
          본 행사의 세부 부스 배치도 및 재고 현황은 주최 측 공지 후 실시간 업데이트됩니다.
        </div>
      `;
    } else {
      DOM.detailBoothCount.textContent = `${event.booths.length}개 부스 실시간 연동`;
      event.booths.forEach(b => {
        const bCard = document.createElement('div');
        bCard.className = 'booth-card';
        bCard.innerHTML = `
          <div class="booth-card__header">
            <span class="booth-card__number">${b.boothNumber}</span>
            ${getStockBadgeHtml(b.inventoryStatus)}
          </div>
          <div class="booth-card__name">${b.name}</div>
          <div class="booth-card__footer">
            <span>참여: ${b.participationDates.join(', ')}</span>
            <span>대기 약 ${b.waitMinutes}분 (${b.reportedAt})</span>
          </div>
        `;
        DOM.detailBoothsList.appendChild(bCard);
      });
    }

    DOM.viewDetail.classList.add('is-active');
  }

  function updateDetailSaveBtn(eventId) {
    const isSaved = state.savedEventIds.has(eventId);
    DOM.detailSaveText.textContent = isSaved ? '저장 취소' : '저장하기';
    DOM.btnDetailSave.style.color = isSaved ? 'var(--rose-500)' : 'var(--gray-700)';
  }

  // 9. Target Pilgrimage & Nonstop Road Flow
  function renderPilgrimage() {
    // Populate event selector
    const eventsWithBooths = window.MinnamitnaData.events.filter(e => e.booths && e.booths.length > 0);
    DOM.pilgrimageEventSelect.innerHTML = eventsWithBooths.map(e => `
      <option value="${e.id}" ${e.id === state.selectedPilgrimageEventId ? 'selected' : ''}>${e.title}</option>
    `).join('');

    const currentEvent = window.MinnamitnaData.events.find(e => e.id === state.selectedPilgrimageEventId) || eventsWithBooths[0];
    if (!currentEvent || !currentEvent.booths) return;

    // Render Nonstop Road steps
    DOM.pilgrimageBoothList.innerHTML = '';
    currentEvent.booths.forEach((booth, idx) => {
      const isVisited = state.visitedBooths.has(booth.id);
      const step = document.createElement('div');
      step.className = 'road-step';
      step.innerHTML = `
        <div class="road-step__badge" style="${isVisited ? 'background: var(--emerald-500);' : ''}">${idx + 1}</div>
        <div class="road-step__content">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
            <span style="font-weight: 700; font-size: 14px;">[${booth.boothNumber}] ${booth.name}</span>
            ${getStockBadgeHtml(booth.inventoryStatus)}
          </div>
          <div style="font-size: 12px; color: var(--gray-600); margin-bottom: 8px;">
            예상 대기: <strong>${booth.waitMinutes}분</strong> · 제보: ${booth.reportedAt}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="font-size: 12px; display: flex; align-items: center; gap: 6px; cursor: pointer;">
              <input type="checkbox" class="chk-visited" data-booth-id="${booth.id}" ${isVisited ? 'checked' : ''}>
              <span>${isVisited ? '✅ 방문 완료' : '방문 체크하기'}</span>
            </label>
            <button class="btn btn--secondary btn--sm btn-report-stock" data-booth-id="${booth.id}" style="padding: 2px 8px; font-size: 11px;">
              📢 재고 제보
            </button>
          </div>
        </div>
      `;

      // Checkbox event
      step.querySelector('.chk-visited').addEventListener('change', (e) => {
        if (e.target.checked) {
          state.visitedBooths.add(booth.id);
          showToast(`'${booth.name}' 방문 완료 처리되었습니다.`);
        } else {
          state.visitedBooths.delete(booth.id);
        }
        localStorage.setItem(STORAGE_KEYS.PILGRIMAGE_STATUS, JSON.stringify([...state.visitedBooths]));
        renderPilgrimage();
      });

      // Stock report action
      step.querySelector('.btn-report-stock').addEventListener('click', () => {
        const statuses = ['enough', 'normal', 'low', 'soldout'];
        const next = statuses[(statuses.indexOf(booth.inventoryStatus) + 1) % statuses.length];
        booth.inventoryStatus = next;
        booth.reportedAt = '방금 전';
        showToast(`'${booth.name}' 실시간 재고 제보가 반영되었습니다.`);
        renderPilgrimage();
      });

      DOM.pilgrimageBoothList.appendChild(step);
    });
  }

  // 10. KamiOshi Community & Off-Record Chat
  function renderCommunity() {
    if (state.postFilter === 'all') {
      DOM.kamioshiPostsList.innerHTML = '';
      state.communityPosts.forEach(post => DOM.kamioshiPostsList.appendChild(createCommunityCard(post)));
    } else {
      DOM.kamioshiPostsList.innerHTML = '';
      const filtered = state.communityPosts.filter(p => p.type === state.postFilter || (state.postFilter === 'popular' && p.likeCount >= 30));
      if (filtered.length === 0) {
        DOM.kamioshiPostsList.innerHTML = `<div class="empty-state"><p class="empty-state__desc">해당 카테고리의 게시글이 아직 없습니다.</p></div>`;
      } else {
        filtered.forEach(post => DOM.kamioshiPostsList.appendChild(createCommunityCard(post)));
      }
    }

    // Off record QA render
    DOM.offrecordQAList.innerHTML = '';
    window.MinnamitnaData.offRecordQuestions.forEach(q => {
      const qCard = document.createElement('div');
      qCard.style.cssText = 'background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: 14px; margin-bottom: 12px;';
      qCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-weight: 700; font-size: 14px; color: var(--black);">Q. ${q.question}</span>
          ${getVerificationBadgeHtml(q.status)}
        </div>
        <div style="font-size: 13px; color: var(--gray-700); line-height: 1.4; margin-bottom: 8px; background: var(--gray-50); padding: 10px; border-radius: 8px;">
          <strong>A.</strong> ${q.answer}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--gray-500);">
          <span>출처: ${q.source}</span>
          <button class="icon-btn btn-report-q" style="min-width: 32px; min-height: 32px; font-size: 14px;" title="허위 정보 신고">🛡️</button>
        </div>
      `;
      qCard.querySelector('.btn-report-q').addEventListener('click', () => {
        openGuardianModal();
      });
      DOM.offrecordQAList.appendChild(qCard);
    });
  }

  function createCommunityCard(post) {
    const card = document.createElement('article');
    card.className = 'community-card';
    card.innerHTML = `
      <div class="community-card__header">
        <div class="community-card__user">
          <img class="community-card__avatar" src="${post.authorAvatar}" alt="${post.author}">
          <div>
            <div class="community-card__author">${post.author}</div>
            <div class="community-card__time">${post.createdAt}</div>
          </div>
        </div>
        <button class="icon-btn btn-card-guardian" style="min-width: 32px; min-height: 32px; font-size: 14px;" title="신고/차단">🛡️</button>
      </div>
      <h3 class="community-card__title">${post.title}</h3>
      <p class="community-card__body">${post.content}</p>
      ${post.images && post.images.length > 0 ? `<img src="${post.images[0]}" style="width: 100%; max-height: 160px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" alt="첨부 이미지">` : ''}
      <div class="community-card__footer">
        <div style="display: flex; gap: 4px;">
          ${post.keywords.map(kw => `<span class="keyword-chip" style="font-size: 10px; padding: 2px 6px;">#${kw}</span>`).join('')}
        </div>
        <div class="community-card__actions">
          <button class="community-card__action-btn btn-like">❤️ <span>${post.likeCount}</span></button>
          <button class="community-card__action-btn btn-comment">💬 <span>${post.commentCount}</span></button>
        </div>
      </div>
    `;

    // Like Action
    const likeBtn = card.querySelector('.btn-like');
    likeBtn.addEventListener('click', () => {
      post.likeCount += 1;
      likeBtn.querySelector('span').textContent = post.likeCount;
      showToast('게시글에 공감했습니다.');
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_POSTS, JSON.stringify(state.communityPosts));
    });

    // Guardian modal trigger
    card.querySelector('.btn-card-guardian').addEventListener('click', (e) => {
      e.stopPropagation();
      openGuardianModal();
    });

    return card;
  }

  // 11. Count Cash Budget Manager
  function renderCountCash() {
    DOM.countcashEventName.textContent = `대상 행사: ${state.budget.eventTitle || 'AGF 2026'}`;
    DOM.inputBudgetTicket.value = state.budget.ticket;
    DOM.inputBudgetTransport.value = state.budget.transport;
    DOM.inputBudgetFood.value = state.budget.food;

    DOM.budgetGoodsList.innerHTML = '';
    state.budget.goods.forEach((good, index) => {
      const row = document.createElement('div');
      row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: var(--gray-50); padding: 8px 12px; border-radius: 8px; font-size: 13px;';
      row.innerHTML = `
        <div>
          <strong>${good.name}</strong> <span style="font-size: 11px; color: var(--gray-500);">(${good.booth || '부스'})</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>${formatCurrency(good.price)}</span>
          <button class="icon-btn btn-remove-good" style="min-width: 24px; min-height: 24px; font-size: 14px;" data-index="${index}">✕</button>
        </div>
      `;
      row.querySelector('.btn-remove-good').addEventListener('click', () => {
        state.budget.goods.splice(index, 1);
        renderCountCash();
      });
      DOM.budgetGoodsList.appendChild(row);
    });

    recalculateBudget();
  }

  function recalculateBudget() {
    const ticket = Number(DOM.inputBudgetTicket.value) || 0;
    const transport = Number(DOM.inputBudgetTransport.value) || 0;
    const food = Number(DOM.inputBudgetFood.value) || 0;
    const goodsTotal = state.budget.goods.reduce((acc, g) => acc + (Number(g.price) || 0), 0);
    const total = ticket + transport + food + goodsTotal;
    const cap = 150000;
    const remain = cap - total;

    DOM.budgetTotalVal.textContent = formatCurrency(total);
    DOM.budgetRemainVal.textContent = formatCurrency(remain);
    DOM.budgetRemainVal.style.color = remain < 0 ? 'var(--rose-500)' : 'var(--white)';
  }

  // 12. Oshi Theme Labs Records
  function renderThemeLabs() {
    DOM.themelabsRecordsContainer.innerHTML = '';
    if (state.themeLabRecords.length === 0) {
      DOM.themelabsRecordsContainer.innerHTML = `<div class="empty-state"><p class="empty-state__desc">아직 작성된 행사 활동 기록이 없습니다.</p></div>`;
      return;
    }

    state.themeLabRecords.forEach(rec => {
      const card = document.createElement('div');
      card.style.cssText = 'border: 1px solid var(--gray-200); border-radius: 12px; padding: 14px; background: white;';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <strong style="font-size: 14px;">${rec.eventTitle}</strong>
          <span style="font-size: 11px; color: var(--gray-400);">${rec.date}</span>
        </div>
        <p style="font-size: 13px; color: var(--gray-700); margin: 6px 0 10px;">${rec.review}</p>
        ${rec.images && rec.images.length > 0 ? `<img src="${rec.images[0]}" style="width: 100%; max-height: 140px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" alt="후기 사진">` : ''}
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; border-top: 1px solid var(--gray-100); padding-top: 8px;">
          <span style="color: var(--primary); font-weight: 700;">지출 합계: ${formatCurrency(rec.amountSpent)}</span>
          <span style="color: var(--gray-500);">❤️ ${rec.likeCount || 0}</span>
        </div>
      `;
      DOM.themelabsRecordsContainer.appendChild(card);
    });
  }

  // 13. My Page View
  function renderMyPage() {
    const savedList = window.MinnamitnaData.events.filter(e => state.savedEventIds.has(e.id));
    DOM.mySavedCount.textContent = savedList.length;
    DOM.mySavedList.innerHTML = '';
    if (savedList.length === 0) {
      DOM.mySavedList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">📌</div>
          <h4 class="empty-state__title">저장한 행사가 없습니다</h4>
          <p class="empty-state__desc">홈 또는 탐색에서 방문하고 싶은 행사를 저장해보세요.</p>
        </div>
      `;
    } else {
      savedList.forEach(e => {
        DOM.mySavedList.appendChild(createEventCard(e));
      });
    }
  }

  // 14. Guardian Modal Logic
  function openGuardianModal() {
    DOM.modalGuardian.classList.add('is-active');
  }

  function closeGuardianModal() {
    DOM.modalGuardian.classList.remove('is-active');
  }

  // 15. Onboarding Controller
  function initOnboarding() {
    const isOnboarded = localStorage.getItem(STORAGE_KEYS.ONBOARDED);
    if (!isOnboarded) {
      DOM.viewOnboarding.style.display = 'flex';
      setupOnboardingSteps();
    }
  }

  function setupOnboardingSteps() {
    const step1 = document.getElementById('onboarding-step-1');
    const step2 = document.getElementById('onboarding-step-2');
    const step3 = document.getElementById('onboarding-step-3');
    const step4 = document.getElementById('onboarding-step-4');

    document.getElementById('btn-onboarding-step1-next').addEventListener('click', () => {
      step1.classList.remove('is-active');
      step2.classList.add('is-active');
    });

    document.querySelectorAll('#onboarding-category-grid .select-card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('is-selected'));
    });

    document.getElementById('btn-onboarding-step2-next').addEventListener('click', () => {
      step2.classList.remove('is-active');
      step3.classList.add('is-active');

      // Populate keywords
      const container = document.getElementById('onboarding-keyword-chips');
      container.innerHTML = window.MinnamitnaData.keywords.map(kw => {
        const isSel = state.userKeywords.includes(kw);
        return `<button class="filter-chip ${isSel ? 'is-active' : ''}" data-kw="${kw}">#${kw}</button>`;
      }).join('');

      container.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => chip.classList.toggle('is-active'));
      });
    });

    document.getElementById('btn-onboarding-step3-next').addEventListener('click', () => {
      const selected = [];
      document.querySelectorAll('#onboarding-keyword-chips .filter-chip.is-active').forEach(c => {
        selected.push(c.getAttribute('data-kw'));
      });
      if (selected.length < 3) {
        showToast('취향 추천을 위해 키워드를 최소 3개 이상 선택해주세요!');
        return;
      }
      state.userKeywords = selected;
      localStorage.setItem(STORAGE_KEYS.KEYWORDS, JSON.stringify(selected));

      step3.classList.remove('is-active');
      step4.classList.add('is-active');
    });

    const completeOnboarding = () => {
      localStorage.setItem(STORAGE_KEYS.ONBOARDED, 'true');
      DOM.viewOnboarding.style.display = 'none';
      renderHome();
      showToast('민나믿나에 오신 것을 환영합니다! ✨');
    };

    document.getElementById('btn-onboarding-finish').addEventListener('click', completeOnboarding);
    document.getElementById('btn-onboarding-skip').addEventListener('click', completeOnboarding);
  }

  // 16. Event Bindings & Init
  function setupEventListeners() {
    // Bottom Nav
    DOM.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        switchTab(target);
      });
    });

    // Logo click -> Home
    DOM.brandLogo.addEventListener('click', () => switchTab('screen-home'));

    // Top Header Search Button -> Explore tab
    document.getElementById('btn-header-search').addEventListener('click', () => switchTab('screen-explore'));
    document.getElementById('btn-header-alarm').addEventListener('click', () => showToast('새로운 알림이 없습니다.'));

    // Explore Search Input
    DOM.exploreSearchInput.addEventListener('input', (e) => {
      state.exploreFilter.search = e.target.value;
      renderExplore();
    });
    DOM.btnClearSearch.addEventListener('click', () => {
      DOM.exploreSearchInput.value = '';
      state.exploreFilter.search = '';
      renderExplore();
    });

    // Explore Region, Status, Sort
    DOM.filterRegion.addEventListener('change', (e) => {
      state.exploreFilter.region = e.target.value;
      renderExplore();
    });
    DOM.filterStatus.addEventListener('change', (e) => {
      state.exploreFilter.status = e.target.value;
      renderExplore();
    });
    DOM.filterSort.addEventListener('change', (e) => {
      state.exploreFilter.sort = e.target.value;
      renderExplore();
    });

    // Detail View controls
    DOM.btnCloseDetail.addEventListener('click', () => DOM.viewDetail.classList.remove('is-active'));
    DOM.btnDetailShare.addEventListener('click', () => {
      navigator.clipboard ? navigator.clipboard.writeText(window.location.href) : null;
      showToast('행사 링크가 클립보드에 복사되었습니다.');
    });
    DOM.btnDetailSave.addEventListener('click', () => {
      if (state.selectedEventForDetail) toggleSaveEvent(state.selectedEventForDetail);
    });
    DOM.btnDetailAddPilgrimage.addEventListener('click', () => {
      if (state.selectedEventForDetail) {
        state.selectedPilgrimageEventId = state.selectedEventForDetail;
        DOM.viewDetail.classList.remove('is-active');
        switchTab('screen-pilgrimage');
        showToast('타겟 순례 목록에 행사가 등록되었습니다.');
      }
    });

    // Pilgrimage controls
    DOM.pilgrimageEventSelect.addEventListener('change', (e) => {
      state.selectedPilgrimageEventId = e.target.value;
      renderPilgrimage();
    });
    DOM.btnGenerateRoute.addEventListener('click', () => {
      showToast('출입구 및 혼잡도를 반영하여 최적 동선이 재계산되었습니다! ⚡');
      renderPilgrimage();
    });

    // KamiOshi tabs
    DOM.tabBtnKamioshi.addEventListener('click', () => {
      DOM.tabBtnKamioshi.classList.add('is-active');
      DOM.tabBtnKamioshi.style.borderBottom = '2px solid var(--primary)';
      DOM.tabBtnKamioshi.style.color = 'var(--primary)';
      DOM.tabBtnOffrecord.classList.remove('is-active');
      DOM.tabBtnOffrecord.style.borderBottom = 'none';
      DOM.tabBtnOffrecord.style.color = 'var(--gray-500)';
      DOM.kamioshiContainer.style.display = 'block';
      DOM.offrecordContainer.style.display = 'none';
    });

    DOM.tabBtnOffrecord.addEventListener('click', () => {
      DOM.tabBtnOffrecord.classList.add('is-active');
      DOM.tabBtnOffrecord.style.borderBottom = '2px solid var(--primary)';
      DOM.tabBtnOffrecord.style.color = 'var(--primary)';
      DOM.tabBtnKamioshi.classList.remove('is-active');
      DOM.tabBtnKamioshi.style.borderBottom = 'none';
      DOM.tabBtnKamioshi.style.color = 'var(--gray-500)';
      DOM.kamioshiContainer.style.display = 'none';
      DOM.offrecordContainer.style.display = 'block';
    });

    // KamiOshi post filter
    document.querySelectorAll('[data-post-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-post-filter]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.postFilter = btn.getAttribute('data-post-filter');
        renderCommunity();
      });
    });

    // Write Community Post
    DOM.btnOpenCreatePost.addEventListener('click', () => {
      const title = prompt('게시글 제목을 입력하세요:');
      if (!title) return;
      const content = prompt('내용을 입력하세요:');
      if (!content) return;

      const newPost = {
        id: 'post-' + Date.now(),
        author: '오시러버 (나)',
        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=user77',
        type: 'talk',
        title: title,
        content: content,
        images: [],
        keywords: ['팬소통'],
        likeCount: 0,
        commentCount: 0,
        createdAt: '방금 전'
      };

      state.communityPosts.unshift(newPost);
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_POSTS, JSON.stringify(state.communityPosts));
      renderCommunity();
      showToast('게시글이 성공적으로 등록되었습니다!');
    });

    // Off record question
    DOM.btnAskQuestion.addEventListener('click', () => {
      const q = prompt('궁금한 행사 또는 굿즈 질문을 남겨주세요:');
      if (!q) return;
      window.MinnamitnaData.offRecordQuestions.unshift({
        id: 'q-' + Date.now(),
        author: '나',
        question: q,
        answer: '현재 현장 서포터즈 및 공식 공지사항 대조 검증 중입니다...',
        source: '검증 대기',
        status: 'pending',
        verifiedCount: 1
      });
      renderCommunity();
      showToast('질문이 등록되었습니다. 검증 답변이 곧 달립니다.');
    });

    // Count Cash Bottom Sheet
    DOM.btnOpenCountCash.addEventListener('click', () => {
      DOM.sheetCountCash.classList.add('is-active');
      renderCountCash();
    });
    DOM.btnCloseCountCash.addEventListener('click', () => DOM.sheetCountCash.classList.remove('is-active'));

    ['input-budget-ticket', 'input-budget-transport', 'input-budget-food'].forEach(id => {
      document.getElementById(id).addEventListener('input', recalculateBudget);
    });

    DOM.btnAddGoods.addEventListener('click', () => {
      const name = DOM.inputNewGoodName.value.trim();
      const price = Number(DOM.inputNewGoodPrice.value) || 0;
      if (!name || price <= 0) {
        showToast('굿즈 이름과 올바른 금액을 입력하세요.');
        return;
      }
      state.budget.goods.push({ id: 'g-' + Date.now(), name, price, booth: '현장부스' });
      DOM.inputNewGoodName.value = '';
      DOM.inputNewGoodPrice.value = '';
      renderCountCash();
    });

    DOM.btnSaveBudget.addEventListener('click', () => {
      state.budget.ticket = Number(DOM.inputBudgetTicket.value) || 0;
      state.budget.transport = Number(DOM.inputBudgetTransport.value) || 0;
      state.budget.food = Number(DOM.inputBudgetFood.value) || 0;
      localStorage.setItem(STORAGE_KEYS.BUDGET_DATA, JSON.stringify(state.budget));
      DOM.sheetCountCash.classList.remove('is-active');
      showToast('예산 계획이 저장되었습니다! 💳');
    });

    // Theme Labs Bottom Sheet
    DOM.btnOpenThemeLabs.addEventListener('click', () => {
      DOM.sheetThemeLabs.classList.add('is-active');
      renderThemeLabs();
    });
    DOM.btnCloseThemeLabs.addEventListener('click', () => DOM.sheetThemeLabs.classList.remove('is-active'));

    DOM.btnSubmitLabLog.addEventListener('click', () => {
      const title = DOM.inputLabTitle.value.trim();
      const review = DOM.inputLabReview.value.trim();
      const amount = Number(DOM.inputLabAmount.value) || 0;
      if (!title || !review) {
        showToast('행사명과 후기를 입력해주세요.');
        return;
      }

      state.themeLabRecords.unshift({
        id: 'lab-' + Date.now(),
        eventId: 'evt-custom',
        eventTitle: title,
        date: new Date().toISOString().split('T')[0],
        images: ['https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80'],
        review: review,
        purchasedGoods: [],
        amountSpent: amount,
        isPublic: true,
        likeCount: 0
      });

      localStorage.setItem(STORAGE_KEYS.LAB_RECORDS, JSON.stringify(state.themeLabRecords));
      DOM.inputLabTitle.value = '';
      DOM.inputLabReview.value = '';
      DOM.inputLabAmount.value = '';
      renderThemeLabs();
      showToast('행사 기록이 타임라인에 등록되었습니다! 📸');
    });

    // Guardian actions
    DOM.btnManageGuardian.addEventListener('click', openGuardianModal);
    DOM.btnCancelReport.addEventListener('click', closeGuardianModal);
    DOM.btnConfirmReport.addEventListener('click', () => {
      closeGuardianModal();
      showToast('신고가 안전하게 접수되었습니다. 오시 가디언이 신속히 검토합니다.');
    });

    // Reset prototype
    DOM.btnResetPrototype.addEventListener('click', () => {
      if (confirm('프로토타입 데이터를 초기 상태로 리셋하시겠습니까?')) {
        localStorage.clear();
        location.reload();
      }
    });

    // Manage keywords
    DOM.btnManageKeywords.addEventListener('click', () => {
      const added = prompt('추가하고 싶은 관심 키워드를 입력하세요 (예: 코스프레, 성우):');
      if (added && !state.userKeywords.includes(added)) {
        state.userKeywords.push(added.trim());
        localStorage.setItem(STORAGE_KEYS.KEYWORDS, JSON.stringify(state.userKeywords));
        renderHome();
        showToast(`'${added}' 키워드가 추가되었습니다.`);
      }
    });

    // Data-navigate attributes helper
    document.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', () => {
        const dest = el.getAttribute('data-navigate');
        if (dest === 'explore') switchTab('screen-explore');
        if (dest === 'my') switchTab('screen-my');
      });
    });
  }

  // App bootstrap
  function init() {
    initOnboarding();
    setupEventListeners();
    renderHome();
    renderPilgrimage();
    renderCommunity();
    renderMyPage();
  }

  // Run when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
